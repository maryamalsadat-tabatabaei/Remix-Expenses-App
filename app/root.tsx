import tailwindStylesUrl from "~/tailwind.css";
import globalStylesUrl from "~/styles/shared.css";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { FaExclamationCircle } from "react-icons/fa";
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
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="error">
        <div className="icon">
          <FaExclamationCircle />
        </div>
        <h2>An Error Occured!</h2>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
