import type { ActionArgs } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import Login from "./_auth.login";
import { db } from "./../utils/db.server";
import { badRequest } from "../utils/request.server";
import { login, createUserSession, register } from "~/utils/session.server";

export default function AuthPage() {
  return (
    <main>
      <Login />
    </main>
  );
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
  const urls = ["/jokes", "/auth", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/jokes";
}
export const action = async ({ request, params }: ActionArgs) => {
  const authMode = params.mode || "login";
  const formSubmission = await request.formData();
  const { email, password } = Object.fromEntries(formSubmission);
  const redirectTo = validateUrl(
    (formSubmission.get("redirectTo") as string) || "/expenses"
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
