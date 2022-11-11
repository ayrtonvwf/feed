import { TenantUser, User } from "@prisma/client";
import { LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  redirect,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { MyLink } from "~/components/typography/link";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";
import { showToast } from "~/services/toast.server";

type LoaderData = {
  tenantUsers: (TenantUser & { User: User })[];
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

  const tenantUsers = await prisma.tenantUser.findMany({
    include: { User: true },
    where: { tenantId },
  });
  await prisma.$disconnect();

  showToast(session, "teste de toast");
  return redirect("/feeds", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
  // return typedjson({ tenantUsers }, { headers: { "Set-Cookie": await commitSession(session) } });
};

export default function Index() {
  const { tenantUsers } = useTypedLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <Panel>
        <MyH1>Users</MyH1>
        <ul>
          {tenantUsers.map((tenantUser) => (
            <li>
              <MyLink to={`/user/${tenantUser.User.id}`}>
                {tenantUser.User.name}
              </MyLink>
              <MyLink to={`/users/${tenantUser.User.id}/remove`}>
                Remover
              </MyLink>
            </li>
          ))}
        </ul>
      </Panel>
      <Outlet />
    </main>
  );
}
