import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from "~/tailwind.css";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import MainHeader from "./components/navigation/MainHeader";
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
// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: globalStylesUrl },
//   {
//     rel: "stylesheet",
//     href: globalMediumStylesUrl,
//     media: "print, (min-width: 640px)",
//   },
//   {
//     rel: "stylesheet",
//     href: globalLargeStylesUrl,
//     media: "screen and (min-width: 1024px)",
//   },
// ];

export const meta: V2_MetaFunction = () => {
  const description = "Remix expenses app for handling expenses!";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Remix: So great, it's funny!" },
  ];
};
export const links: LinksFunction = () => [
  ...[{ rel: "stylesheet", href: stylesheet }],
];

function Document({
  children,
  title = "Remix: So great, it's funny!",
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Remix,jokes" />
        <meta
          name="twitter:image"
          content="https://remix-jokes.lol/social.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@remix_run" />
        <meta name="twitter:site" content="@remix_run" />
        <meta name="twitter:title" content="Remix Jokes" />
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
      <MainHeader />
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
