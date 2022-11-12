import { Dialog } from "@reach/dialog";
import styles from "@reach/dialog/styles.css";
import {
  ActionFunction,
  DataFunctionArgs,
  LinksFunction,
  redirect,
} from "@remix-run/cloudflare";
import { Form, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { MyH3 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";
import { ulid } from "~/services/uild.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
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

  await prisma.$connect();

  const tenantUser = await prisma.tenantUser.findFirst({
    where: { tenantId, userId: user.id },
  });

  if (user.type !== "SUPERADMIN" && tenantUser?.type !== "MANAGER") {
    await prisma.$disconnect();
    return redirect("/");
  }

  const body = await request.formData();
  const email = body.get("email")?.toString() || "sem@email.com";

  await prisma.$connect();
  const [existingInvite, existingTenantUser] = await Promise.all([
    prisma.tenantInvite.findFirst({
      where: { email, tenantId },
    }),
    prisma.tenantUser.findFirst({
      where: { User: { email }, tenantId },
    }),
  ]);

  if (existingInvite && !existingInvite.respondedAt) {
    await prisma.$disconnect();
    throw new Error("Invite already exists");
  }

  if (existingTenantUser) {
    await prisma.$disconnect();
    throw new Error("User already on tenant");
  }

  if (existingInvite) {
    await prisma.tenantInvite.delete({
      where: { id: existingInvite.id },
    });
  }

  await prisma.tenantInvite.create({
    data: {
      id: ulid(),
      email,
      tenantId,
      invitedByUserId: user.id,
    },
  });

  await prisma.$disconnect();

  return redirect("/invite/tenant");
};

export default function CreateTenantInviteModal() {
  const navigate = useNavigate();
  const onDismiss = () => navigate(`/invite/tenant`);
  const title = `Create invite for tenant`;

  return (
    <Dialog
      className="dialog"
      isOpen={true}
      aria-label={title}
      onDismiss={onDismiss}
    >
      <MyH3>{title}</MyH3>
      <Form method="post">
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <button type="submit">Invite</button>
      </Form>
    </Dialog>
  );
}
