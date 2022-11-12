import { LoaderArgs } from "@remix-run/cloudflare";
import { Form, Outlet } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Panel } from "~/components/block/panel";
import { DateTime } from "~/components/typography/date-time";
import { MyH1 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

export const loader = async ({ request, context }: LoaderArgs) => {
  const sessionStorage = makeSession(context);
  const user = await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  await prisma.$connect();

  const tenantInvites = await prisma.tenantInvite.findMany({
    where: { email: user.email, respondedAt: null },
    include: { Tenant: true },
  });

  await prisma.$disconnect();

  return typedjson({ tenantInvites });
};

export default function Index() {
  const { tenantInvites } = useTypedLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <MyH1>Invites</MyH1>
      <Panel>
        <ul>
          {tenantInvites.map((tenantInvite) => (
            <li>
              {tenantInvite.Tenant.name} -{" "}
              <DateTime>{tenantInvite.createdAt}</DateTime>
              <Form
                method="post"
                action={`/invite/respond/${tenantInvite.id}?response=ignore`}
              >
                <button type="submit">Ignore</button>
              </Form>
              <Form
                method="post"
                action={`/invite/respond/${tenantInvite.id}?response=accept`}
              >
                <button type="submit">Accept</button>
              </Form>
            </li>
          ))}
        </ul>
      </Panel>
      <Outlet />
    </main>
  );
}
