import { Tenant, TenantUser, User } from "@prisma/client";
import { LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import { Panel } from "~/components/block/panel";
import { MyLink } from "~/components/typography/link";
import { MyH1 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

type LoaderData = {
  users: (User & { TenantUser: TenantUser[] })[];
  tenants: Tenant[];
};

export const loader = async ({
  request,
  context,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const sessionStorage = makeSession(context);
  const user = await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  await prisma.$connect();
  const [users, tenants] = await Promise.all([
    prisma.user.findMany({
      include: { TenantUser: true },
    }),
    prisma.tenant.findMany(),
  ]);
  await prisma.$disconnect();
  return typedjson({ users, tenants });
};

export default function Index() {
  const { users } = useTypedLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <Panel>
        <MyH1>Users</MyH1>
        <ul>
          {users.map((user) => (
            <li>
              <MyLink to={`/user/${user.id}`}>{user.name}</MyLink>
              <MyLink to={`/admin/users/${user.id}/tenants`}>
                {user.TenantUser.length} tenants
              </MyLink>
              {/* <Form method="post" style={{ display: "inline" }}>
                <input type="hidden" name="userId" value={user.id} />
                <button type="submit" name="_action" value="delete">
                  Delete
                </button> */}
              {/* </Form> */}
            </li>
          ))}
        </ul>
      </Panel>
      <Outlet />
    </main>
  );
}
