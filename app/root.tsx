import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { NotFound } from "./components/error/not-found";
import { InternalServerError } from "./components/error/internal-server";
import { LinksFunction } from "@remix-run/node";
import tailwindStyleSheetUrl from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyleSheetUrl },
];

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        {isRouteErrorResponse(error) && error.status === 404 ? (
          <NotFound />
        ) : (
          <InternalServerError />
        )}
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
