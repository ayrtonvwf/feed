import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Feed, User } from "@prisma/client";
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
  user: User|null;
  tenantId: string|null;
}

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const session = await getSession(request.headers.get("cookie"));
  const user = await authenticator.isAuthenticated(request);
  const tenantId: string|null = session.get('tenantId')?.toString() || null;

  if (!tenantId) {
    return json({ feeds: [], user, tenantId });
  }

  await prisma.$connect();
  const feeds = await prisma.feed.findMany({ where: { tenantId } });
  await prisma.$disconnect();
  return json({ feeds, user, tenantId });
};

export default function App() {
  const { feeds, tenantId, user } = useLoaderData<LoaderData>();

  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          {tenantId && <b>{tenantId}</b>}
          {user && <b>{user.id}</b>}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tenants">Tenants</Link>
            <Link to="/users">Usuários</Link>
            {user && <Link to="/logout">Sair</Link>}
            {!user && <Link to="/login">Entrar</Link>}
          </nav>
          <nav>
            {feeds.map(feed => <Link to={`/feed/${feed.id}`} key={feed.id}>{feed.title}</Link>)}
          </nav>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
