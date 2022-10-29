import { Tenant, TenantUser, User } from "@prisma/client";
import { DataFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { TypedResponse } from "@remix-run/react/dist/components";
import { Panel } from "~/components/block/panel";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

type LoaderData = {
  users: (User & {TenantUser: TenantUser[]})[];
  tenants: Tenant[];
}

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect('/');
  }

  await prisma.$connect();
  const [users, tenants] = await Promise.all([
    prisma.user.findMany({
      include: { TenantUser: true },
    }),
    prisma.tenant.findMany(),
  ]);
  await prisma.$disconnect();
  return json({ users, tenants });
};

export default function Index() {
  const {users} = useLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <Panel>
        <MyH1>Users</MyH1>
        <ul>
          {users.map(user => (
            <li>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
              <Form method="post" style={{ display: 'inline' }}>
                <input type="hidden" name="userId" value={user.id} />
                <button type="submit" name="_action" value="delete">Delete</button>
              </Form>
            </li>
          ))}
        </ul>
      </Panel>
    </main>
  );
}
