import type { ActionArgs } from "@remix-run/node";
import Login from "./_auth.login";
// import { db } from "../../utils/db.server";
import { badRequest } from "../utils/request.server";

export default function AuthPage() {
  return (
    <main>
      <Login />
    </main>
  );
}
function validateUsername(username: string) {
  if (username.trim().length < 3) {
    return "Usernames must be at least 3 characters long";
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
export const action = async ({ request }: ActionArgs) => {
  const formSubmission = await request.formData();
  const { username, password } = Object.fromEntries(formSubmission);
  const redirectTo = validateUrl(
    (formSubmission.get("redirectTo") as string) || "/jokes"
  );
  if (
    // typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }
  // const fields = { username, password, loginType };
  const fields = { username, password };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      fromError: null,
    });
  }

  // switch (loginType) {
  //   case "login": {
  //     // login to get the user
  //     // if there's no user, return the fields and a formError
  //     // if there is a user, create their session and redirect to /jokes
  //     return badRequest({
  //       fieldErrors: null,
  //       fields,
  //       formError: "Not implemented",
  //     });
  //   }
  //   case "register": {
  //     const userExists = await db.user.findFirst({
  //       where: { username },
  //     });
  //     if (userExists) {
  //       return badRequest({
  //         fieldErrors: null,
  //         fields,
  //         formError: `User with username ${username} already exists`,
  //       });
  //     }
  //     // create the user
  //     // create their session and redirect to /jokes
  //     return badRequest({
  //       fieldErrors: null,
  //       fields,
  //       formError: "Not implemented",
  //     });
  //   }
  //   default: {
  //     return badRequest({
  //       fieldErrors: null,
  //       fields,
  //       formError: "Login type invalid",
  //     });
  //   }
  // }
};
