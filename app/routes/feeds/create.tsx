import { Dialog } from "@reach/dialog";

import styles from "@reach/dialog/styles.css";
import {
  DataFunctionArgs,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/cloudflare";
import { Form, useNavigate } from "@remix-run/react";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
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

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<{ tenantId: string }>> => {
  const sessionStorage = makeSession(context);
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
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
  const { _action, ...values } = Object.fromEntries(body);

  invariant(
    typeof values.title === "string",
    `values.title should be a string`
  );

  await prisma.feed.create({
    data: {
      id: ulid(),
      title: values.title,
      tenantId,
    },
  });

  return redirect(`/feeds`);
};

export default function TenantCreateFeedModal() {
  const navigate = useNavigate();
  const { tenantId } = useTypedLoaderData<typeof loader>();
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
      <Form method="post">
        <fieldset className="flex flex-col gap-2">
          <input
            name="title"
            placeholder="Título"
            required
            minLength={5}
            className="block w-full rounded-lg bg-gray-200 p-2"
          />
          <button
            type="submit"
            name="_action"
            value="createFeed"
            className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
          >
            Criar
          </button>
        </fieldset>
      </Form>
    </Dialog>
  );
}
