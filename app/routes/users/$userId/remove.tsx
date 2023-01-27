import { Dialog } from "@reach/dialog";
import styles from "@reach/dialog/styles.css";
import { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { MyH3 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader = async ({ request, context, params }: LoaderArgs) => {
  const currentUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );
  invariant(
    typeof params.userId === "string",
    "params.userId should be a string"
  );

  const [user, currentTenantUser] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.userId },
      include: {
        TenantUser: { include: { Tenant: true }, where: { tenantId } },
      },
    }),
    prisma.tenantUser.findFirst({
      where: { tenantId, userId: currentUser.id },
    }),
  ]);

  if (
    !user?.TenantUser?.length ||
    (currentTenantUser?.type !== "MANAGER" && currentUser.type !== "SUPERADMIN")
  ) {
    throw new Error("User not found");
  }

  return typedjson({ user });
};

export const action = async ({ request, context, params }: LoaderArgs) => {
  const currentUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );
  invariant(
    typeof params.userId === "string",
    "params.userId should be a string"
  );

  await prisma.$connect();

  const [user, currentTenantUser] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.userId },
      include: {
        TenantUser: { include: { Tenant: true }, where: { tenantId } },
      },
    }),
    prisma.tenantUser.findFirst({
      where: { tenantId, userId: currentUser.id },
    }),
  ]);

  if (
    !user?.TenantUser?.length ||
    (currentTenantUser?.type !== "MANAGER" && currentUser.type !== "SUPERADMIN")
  ) {
    throw new Error("User not found");
  }

  await prisma.tenantUser.delete({
    where: { id: user.TenantUser[0].id },
  });

  await prisma.$disconnect();

  return redirect(`/users`);
};

export default function UserTenantsModal() {
  const navigate = useNavigate();
  const onDismiss = () => navigate(`/users`);
  const { user } = useTypedLoaderData<typeof loader>();
  const title = `Remove ${user.name} from tenant`;

  return (
    <Dialog
      className="dialog"
      isOpen={true}
      aria-label={title}
      onDismiss={onDismiss}
    >
      <MyH3>{title}</MyH3>
      Are you sure you want to remove the user <b>{user.email}</b> from the
      tenant?
      <Form method="post">
        <button type="submit">Yes, remove them</button>
      </Form>
    </Dialog>
  );
}
