import { Feed, Tenant } from "@prisma/client";
import { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { MyLink } from "~/components/typography/link";
import { MyH1, MyH2 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

type LoaderData = {
  feeds: Feed[];
  tenant: Tenant;
};

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const sessionStorage = makeSession(context);
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: user.id },
    include: { Tenant: { include: { Feed: true } } },
  });

  await prisma.$connect();

  if (
    (user.type !== "SUPERADMIN" && tenantUser?.type !== "MANAGER") ||
    !tenantUser?.Tenant
  ) {
    await prisma.$disconnect();
    return redirect("/");
  }

  await prisma.$disconnect();

  return typedjson({
    tenant: tenantUser.Tenant,
    feeds: tenantUser.Tenant.Feed,
  });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div>
      <h2>Ah não!</h2>
      <h3>Algo de errado não está certo</h3>
      <div>
        {error.name} - {error.message}
      </div>
    </div>
  );
};

export default function () {
  const { tenant, feeds } = useTypedLoaderData<LoaderData>();

  return (
    <div>
      <main className="container mx-auto">
        <MyH1>{tenant.name}</MyH1>
        <Panel>
          <MyLink
            to={`/feeds/create`}
            className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
          >
            Criar Feed
          </MyLink>
        </Panel>
        <Panel>
          <MyH2>Feeds existentes</MyH2>
          {feeds.map((feed) => (
            <>
              <div>
                <h3>{feed.title}</h3>
              </div>
            </>
          ))}
        </Panel>
      </main>
      <Outlet />
    </div>
  );
}
