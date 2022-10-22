import { ActionFunction, LinksFunction, MetaFunction, redirect } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Feed, Tenant, User } from "@prisma/client";
import { DataFunctionArgs, json, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, useSubmit, Form } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";
import { authenticator } from "./services/auth.server";
import { MyNavLink } from "./components/header/link";
import styles from "./styles/app.css"
import { TypedResponse } from "@remix-run/react/dist/components";
import { useTransition } from '@remix-run/react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  feeds: Feed[];
  user: User|null;
  tenantId: string|null;
  tenants: Tenant[];
}

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const session = await getSession(request.headers.get("cookie"));
  const user = await authenticator.isAuthenticated(request);
  const tenantId: string|null = session.get('tenantId')?.toString() || null;
  await prisma.$connect();
  const tenants = await prisma.tenant.findMany();

  if (!tenantId) {
    await prisma.$disconnect();
    return json({ feeds: [], user, tenantId, tenants });
  }

  const feeds = await prisma.feed.findMany({ where: { tenantId } });
  await prisma.$disconnect();
  return json({ feeds, user, tenantId, tenants });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  if (_action === 'setTenant') {
    const session = await getSession(request.headers.get("cookie"));
    session.set('tenantId', values.id);
    return redirect(`/` , {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function App() {
  const transition = useTransition();
  const { feeds, tenantId, user, tenants } = useLoaderData<LoaderData>();
  const submit = useSubmit();

  const onChangeTenant = (event: any) => submit(event.currentTarget, { replace: true })

  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-200">
        <header className="bg-white shadow">
          {tenantId && <b>{tenantId}</b>}
          {user && <b>{user.id}</b>}
          {transition.state !== "idle" && 'Loading...'}
          <nav>
            <MyNavLink to="/">Home</MyNavLink>
            <MyNavLink to="/tenants">Tenants</MyNavLink>
            <MyNavLink to="/users">Usuários</MyNavLink>
            <Form onChange={onChangeTenant} method="post" className="inline">
              <input type="hidden" name="_action" value="setTenant" />
              <select name="id">
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id} selected={tenant.id === tenantId}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </Form>
            {user && <MyNavLink to="/logout">Sair</MyNavLink>}
            {!user && <MyNavLink to="/login">Entrar</MyNavLink>}
          </nav>
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            {feeds.map(feed => (
              <li className="mr-2">
                <MyNavLink to={`/feed/${feed.id}`} key={feed.id} className="inline-block px-4 py-2 text-blue-600 bg-gray-100 rounded-t-lg">{feed.title}</MyNavLink>
              </li>
            ))}
          </ul>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
