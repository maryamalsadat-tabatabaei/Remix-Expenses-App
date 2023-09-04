import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import db from "./../utils/db.server";
import { badRequest } from "../utils/request.server";
import { login, createUserSession, register } from "~/utils/session.server";
import AuthForm from "~/components/auth/AuthForm";
import stylesUrl from "./../styles/auth/login.css";

export default function Login() {
  return <AuthForm />;
}

function validateemail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address";
  }
}
function validatePassword(password: string) {
  if (password.length < 6) {
    return "Passwords must be at least 6 characters long";
  }
}
function validateUrl(url: string) {
  const urls = ["/auth", "/", "/login", "/register"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}
export const action = async ({ request }: ActionArgs) => {
  const url = new URL(request.url);
  const authMode = url.searchParams.get("mode") || "login";
  const formSubmission = await request.formData();
  const { email, password } = Object.fromEntries(formSubmission);
  const redirectTo = validateUrl(
    (formSubmission.get("redirectTo") as string) || "/"
  );
  if (
    // typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string" ||
    !email
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }
  // const fields = { email, password, loginType };
  const fields = { email, password };
  const fieldErrors = {
    password: validatePassword(password),
    email: validateemail(email),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      fromError: null,
    });
  }

  switch (authMode) {
    case "login": {
      const user = await login({ email, password });

      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `Email/Password combination is incorrect`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { email },
      });
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with email ${email} already exists`,
        });
      }
      const user = await register({ email, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Something went wrong trying to create a new user.",
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export const meta: V2_MetaFunction = () => {
  const description =
    "Login to submit your own expenses to Remix expenses App!";

  return [
    { name: "Remix login", content: description },
    { title: "Remix Expenses | Login" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
