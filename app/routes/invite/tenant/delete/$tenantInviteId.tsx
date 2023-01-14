import { Dialog } from "@reach/dialog";
import styles from "@reach/dialog/styles.css";
import {
  ActionFunction,
  DataFunctionArgs,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/node";
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
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );
  invariant(
    typeof params.tenantInviteId === "string",
    "params.tenantInviteId should be a string"
  );

  await prisma.$connect();

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: user.id },
  });

  if (user.type !== "SUPERADMIN" && tenantUser?.type !== "MANAGER") {
    await prisma.$disconnect();
    return redirect("/");
  }

  const tenantInvite = await prisma.tenantInvite.findFirst({
    where: { tenantId, id: params.tenantInviteId },
  });

  if (!tenantInvite) {
    await prisma.$disconnect();
    return redirect("/");
  }

  if (tenantInvite.respondedAt) {
    await prisma.$disconnect();
    return redirect("/invite/tenant");
  }

  return typedjson({ tenantInvite });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );
  invariant(
    typeof params.tenantInviteId === "string",
    "params.tenantInviteId should be a string"
  );

  await prisma.$connect();

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: user.id },
  });

  if (user.type !== "SUPERADMIN" && tenantUser?.type !== "MANAGER") {
    await prisma.$disconnect();
    return redirect("/");
  }

  const tenantInvite = await prisma.tenantInvite.findFirst({
    where: { tenantId, id: params.tenantInviteId },
  });

  if (!tenantInvite) {
    await prisma.$disconnect();
    return redirect("/");
  }

  if (tenantInvite.respondedAt) {
    await prisma.$disconnect();
    return redirect("/invite/tenant");
  }

  await prisma.tenantInvite.delete({
    where: { id: params.tenantInviteId },
  });

  await prisma.$disconnect();

  return redirect("/invite/tenant");
};

export default function DeleteTenantInviteModal() {
  const { tenantInvite } = useTypedLoaderData<typeof loader>();
  const navigate = useNavigate();
  const onDismiss = () => navigate(`/invite/tenant`);
  const title = `Delete invite for tenant`;

  return (
    <Dialog
      className="dialog"
      isOpen={true}
      aria-label={title}
      onDismiss={onDismiss}
    >
      <MyH3>{title}</MyH3>
      Are you sure you want to remove the invite for <b>
        {tenantInvite.email}
      </b>{" "}
      from the tenant?
      <Form method="post">
        <button type="submit">Yes, remove</button>
      </Form>
    </Dialog>
  );
}
