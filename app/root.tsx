import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Feed } from "@prisma/client";
import { DataFunctionArgs, json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { TypedResponse } from "@remix-run/react/dist/components";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";
import { authenticator } from "./services/auth.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  feeds: Feed[];
  userId: string|null;
  companyId: string|null;
}

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const session = await getSession(request.headers.get("cookie"));
  const userId: string|null = session.get('userId')?.toString() || null;
  const companyId: string|null = session.get('companyId')?.toString() || null;

  if (!companyId) {
    return json({ feeds: [], userId, companyId });
  }

  await prisma.$connect();
  const feeds = await prisma.feed.findMany({ where: { companyId } });
  await prisma.$disconnect();
  return json({ feeds });
};

export default function App() {
  const { feeds, companyId, userId } = useLoaderData<LoaderData>();

  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          {companyId && <b>{companyId}</b>}
          <Link to="/">Home</Link>
          <Link to="/companies">Empresas</Link>
          {userId && <Link to="/logout">Sair</Link>}
          {!userId && <Link to="/login">Entrar</Link>}
          {feeds.map(feed => <Link to={`/feed/${feed.id}`} key={feed.id}>{feed.title}</Link>)}
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
