import tailwindStylesUrl from "~/tailwind.css";
import globalStylesUrl from "~/styles/shared.css";
import {
  json,
  type LinksFunction,
  type V2_MetaFunction,
  type LoaderArgs,
} from "@remix-run/node";
import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useNavigate,
  useLoaderData,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import Error from "./components/utils/Error";
import useInactivityTimer from "./components/hooks/useInactivityTimer";
import { getUserId } from "~/utils/session.server";

export const links: LinksFunction = () => [
  ...[
    { rel: "stylesheet", href: tailwindStylesUrl },
    { rel: "stylesheet", href: globalStylesUrl },
    // {
    //   rel: "stylesheet",
    //   href: globalMediumStylesUrl,
    //   media: "print, (min-width: 640px)",
    // },
    // {
    //   rel: "stylesheet",
    //   href: globalLargeStylesUrl,
    //   media: "screen and (min-width: 1024px)",
    // }
  ],
];

export const meta: V2_MetaFunction = () => {
  const description = "Remix expenses app for handling expenses!";

  return [
    { name: "description", content: description },
    { title: "Remix: So great, it's funny!" },
    { charset: "utf-8" },
    { viewport: "width=device-width,initial-scale=1" },
    { keywords: "Remix,expenses" },
  ];
};

function Document({
  children,
  title = "Remix: So great, it's funny!",
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en">
      <head>
        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  return json({ userId });
};

export default function App() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    if (data.userId === null) {
      return;
    }
    await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/login");
  };

  useInactivityTimer(10000000, logoutHandler);

  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage =
    error instanceof Error ? (error as Error).message : "Unknown error";
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>
            {errorMessage || "Something went wrong. Please try again later."}
          </p>

          <Link to="/">Home</Link>
        </Error>
      </main>
    </Document>
  );
}
