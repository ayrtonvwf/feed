import { Dialog } from "@reach/dialog";
import styles from "@reach/dialog/styles.css";
import {
  ActionFunction,
  DataFunctionArgs,
  LinksFunction,
  redirect,
} from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { ulid } from "ulid";
import { z } from "zod";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyH3 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const validator = withZod(
  z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
  })
);

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
  const validated = await validator.validate(await request.clone().formData());

  if (validated.error) {
    // validationError comes from `remix-validated-form`
    return validationError(validated.error, validated.data);
  }

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

  await prisma.$connect();
  const [existingInvite, existingTenantUser] = await Promise.all([
    prisma.tenantInvite.findFirst({
      where: { email: validated.data.email, tenantId },
    }),
    prisma.tenantUser.findFirst({
      where: { User: { email: validated.data.email }, tenantId },
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
      email: validated.data.email,
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
      <ValidatedForm validator={validator} method="post">
        <MyInput name="email" label="E-mail" type="email" />
        <MySubmitButton />
      </ValidatedForm>
    </Dialog>
  );
}
