import { Dialog } from "@reach/dialog";

import styles from "@reach/dialog/styles.css";
import { DataFunctionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { redirect, typedjson, TypedJsonResponse } from "remix-typedjson";
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
    title: z.string().min(5, { message: "Title is required" }),
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

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<{ tenantId: string }>> => {
  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  invariant(
    typeof tenantId === "string",
    `session.tenantId should be a string`
  );

  return typedjson({ tenantId });
};

export const action = async ({
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

  await prisma.feed.create({
    data: {
      id: ulid(),
      title: validated.data.title,
      tenantId,
    },
  });

  return redirect(`/feeds`);
};

export default function TenantCreateFeedModal() {
  const navigate = useNavigate();
  const onDismiss = () => navigate(`/feeds`);
  const title = `Create feed`;

  return (
    <Dialog
      className="dialog"
      isOpen={true}
      aria-label={title}
      onDismiss={onDismiss}
    >
      <MyH3>{title}</MyH3>
      <ValidatedForm validator={validator} method="post">
        <fieldset className="flex flex-col gap-2">
          <MyInput name="title" label="Título" />
          <MySubmitButton />
        </fieldset>
      </ValidatedForm>
    </Dialog>
  );
}
