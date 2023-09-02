import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";

import AuthForm from "~/components/auth/AuthForm";
import stylesUrl from "./../styles/auth/login.css";

export default function Login() {
  return <AuthForm />;
}

export const meta: V2_MetaFunction = () => {
  const description =
    "Login to submit your own expenses to Remix expenses App!";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix Expenses | Login" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
