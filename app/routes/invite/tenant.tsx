import { TenantInvite } from "@prisma/client";
import { LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { DateTime } from "~/components/typography/date-time";
import { MyLink } from "~/components/typography/link";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

type LoaderData = {
  tenantInvites: TenantInvite[];
};

export const loader = async ({
  request,
  context,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );

  await prisma.$connect();

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: user.id },
  });

  if (user.type !== "SUPERADMIN" && tenantUser?.type !== "MANAGER") {
    await prisma.$disconnect();
    return redirect("/");
  }

  const tenantInvites = await prisma.tenantInvite.findMany({
    where: { tenantId },
  });
  await prisma.$disconnect();

  return typedjson({ tenantInvites });
};

export default function Index() {
  const { tenantInvites } = useTypedLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <MyH1>Invites</MyH1>
      <Panel>
        <MyLink
          to={`/invite/tenant/create`}
          className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
        >
          Criar invite
        </MyLink>
      </Panel>
      <Panel>
        <ul>
          {tenantInvites.map((tenantInvite) => (
            <li>
              {tenantInvite.email} -{" "}
              <DateTime>{tenantInvite.createdAt}</DateTime>
              <MyLink to={`/invite/tenant/delete/${tenantInvite.id}`}>
                Delete
              </MyLink>
            </li>
          ))}
        </ul>
      </Panel>
      <Outlet />
    </main>
  );
}
