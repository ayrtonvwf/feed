import { Feed, Tenant, User } from "@prisma/client";
import {
  ActionFunction,
  DataFunctionArgs,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import {
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";
import { MyNavLink } from "./components/header/link";
import { authenticator } from "./services/auth.server";
import styles from "./styles/app.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  feeds: Feed[];
  user: User | null;
  tenantId: string | null;
  tenants: Tenant[];
};

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const session = await getSession(request.headers.get("cookie"));
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return typedjson({ feeds: [], user, tenantId: null, tenants: [] });
  }

  await prisma.$connect();
  const tenants = await prisma.tenant.findMany({
    where: {
      TenantUser: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  const sessionTenantId = session.get("tenantId")?.toString();
  const tenantId: string | null = sessionTenantId || tenants[0]?.id || null;

  const shouldSetTenantId = !sessionTenantId && tenantId;
  if (shouldSetTenantId) {
    session.set("tenantId", tenantId);
  }

  const feeds = tenantId
    ? await prisma.feed.findMany({ where: { tenantId } })
    : [];
  await prisma.$disconnect();

  return typedjson(
    { feeds, user, tenantId, tenants },
    shouldSetTenantId
      ? {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      : undefined
  );
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  if (_action === "setTenant") {
    const session = await getSession(request.headers.get("cookie"));
    session.set("tenantId", values.id);
    return redirect(`/`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function App() {
  const transition = useTransition();
  const { feeds, tenantId, user, tenants } = useTypedLoaderData<LoaderData>();
  const submit = useSubmit();

  const onChangeTenant = (event: any) =>
    submit(event.currentTarget, { replace: true });

  return (
    <html lang="pt-BR">
      <head>
        <title>Feed</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-200">
        <header className="sticky top-0 bg-white pt-2 shadow">
          <div className="container mx-auto">
            <nav className="flex flex-wrap items-center">
              <MyNavLink to="/">Home</MyNavLink>
              {user && (
                <>
                  {user.type === "SUPERADMIN" && (
                    <>
                      <MyNavLink to="/tenants">Tenants</MyNavLink>
                      <MyNavLink to="/users">Usuários</MyNavLink>
                    </>
                  )}
                  <div className="ml-auto">
                    <Form
                      onChange={onChangeTenant}
                      method="post"
                      className="inline"
                    >
                      <input type="hidden" name="_action" value="setTenant" />
                      <select name="id" defaultValue={tenantId || undefined}>
                        {tenants.map((tenant) => (
                          <option key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </option>
                        ))}
                      </select>
                    </Form>
                    <MyNavLink to={`/user/${user.id}`}>{user.name}</MyNavLink>
                    <MyNavLink to="/logout">Sair</MyNavLink>
                  </div>
                </>
              )}
              {!user && (
                <>
                  <MyNavLink to="/create-account">Criar conta</MyNavLink>
                  <MyNavLink to="/login">Entrar</MyNavLink>
                </>
              )}
            </nav>
            {user && (
              <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500">
                {feeds.map((feed) => (
                  <li className="mr-2" key={feed.id}>
                    <MyNavLink
                      to={`/feed/${feed.id}`}
                      key={feed.id}
                      className="inline-block rounded-t-lg bg-gray-100 px-4 py-2 text-blue-600"
                    >
                      {feed.title}
                    </MyNavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>
        <Outlet />
        <div
          className={`fixed inset-0 items-center justify-center bg-white/50 ${
            transition.state === "idle" ? "hidden" : "flex"
          }`}
        >
          <svg
            className="-ml-1 mr-3 h-10 w-10 animate-spin text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
