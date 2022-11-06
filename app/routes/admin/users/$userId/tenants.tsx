import { Dialog } from "@reach/dialog";
import styles from "@reach/dialog/styles.css";
import { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
import { Form, useNavigate } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { MyH3 } from "~/components/typography/title";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader = async ({ request, context, params }: LoaderArgs) => {
  invariant(typeof params.userId === "string", "userId should be a string");

  const [user, tenantsWithoutUser] = await Promise.all([
    prisma.user.findUniqueOrThrow({
      where: { id: params.userId },
      include: { TenantUser: { include: { Tenant: true } } },
    }),
    prisma.tenant.findMany({
      where: {
        NOT: {
          TenantUser: {
            some: {
              userId: params.userId,
            },
          },
        },
      },
    }),
  ]);

  return typedjson({ user, tenantsWithoutUser });
};

export const action = async ({ request, context, params }: LoaderArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  invariant(
    typeof params.userId === "string",
    `params.userId should be a string`
  );

  await prisma.$connect();

  if (_action === "add") {
    invariant(
      typeof values.tenantId === "string",
      `values.tenantId should be a string`
    );

    await prisma.tenantUser.create({
      data: {
        id: ulid(),
        tenantId: values.tenantId,
        userId: params.userId,
      },
    });
  }

  if (_action === "remove") {
    invariant(
      typeof values.tenantUserId === "string",
      `values.tenantUserId should be a string`
    );

    await prisma.tenantUser.delete({
      where: {
        id: values.tenantUserId,
      },
    });
  }

  await prisma.$disconnect();

  return redirect(`/admin/users/${params.userId}/tenants`);
};

export default function UserTenantsModal() {
  const navigate = useNavigate();
  const onDismiss = () => navigate(`/admin/users`);
  const { user, tenantsWithoutUser } = useTypedLoaderData<typeof loader>();
  const title = `Edit ${user.name}'s Tenants`;

  return (
    <Dialog
      className="dialog"
      isOpen={true}
      aria-label={title}
      onDismiss={onDismiss}
    >
      <MyH3>{title}</MyH3>
      <ul>
        {user.TenantUser.map((tenantUser) => (
          <li key={tenantUser.tenantId}>
            {tenantUser.Tenant.name}
            <Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="tenantUserId" value={tenantUser.id} />
              <button type="submit" name="_action" value="remove">
                Remove
              </button>
            </Form>
          </li>
        ))}
      </ul>
      <Form method="post">
        <select name="tenantId">
          {tenantsWithoutUser.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
        <button type="submit" name="_action" value="add">
          Add
        </button>
      </Form>
    </Dialog>
  );
}
