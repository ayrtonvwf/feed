import { Tenant, TenantUser, User } from "@prisma/client";
import { ActionFunction, DataFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { TypedResponse } from "@remix-run/react/dist/components";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { hash } from "~/services/hash.server";
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

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  const email = values.email?.toString() || 'sem@email.com';
  const password = values.password?.toString() || 'Mudar123';

  await prisma.$connect();

  if (_action === 'create') {
    const existing = await prisma.user.findFirst({
      where: { email },
    });
    if (existing) {
      await prisma.$disconnect();
      throw new Error('User already exists');
    }

    await prisma.user.create({
      data: {
        name: body.get('name')?.toString() || 'Sem título',
        email: body.get('email')?.toString() || 'sem@email.com',
        passwordHash: await hash({ password }),
      }
    });
  }

  if (_action === 'add_tenant') {
    await prisma.tenantUser.create({
      data: {
        tenantId: values.tenantId?.toString() || 'undefined-tenant',
        userId: values.userId?.toString() || 'undefined-tenant',
      }
    });
  }
  await prisma.$disconnect();

  return redirect(`/users`);
};

export default function Index() {
  const {users, tenants} = useLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <MyH1>Users</MyH1>
      <Form method="post">
        <input name="name" placeholder="Nome" required minLength={5} />
        <input name="email" placeholder="E-mail" required minLength={5} type="email" />
        <input name="password" placeholder="Senha" required minLength={5} type="password" />
        <button type="submit">Sign up</button>
      </Form>
      <ul>
        {users.map(user => (
          <li>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
            <Form method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="userId" value={user.id} />
              <button type="submit" name="_action" value="delete">Delete</button>
            </Form>
            <Form method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="userId" value={user.id} />
              <select name="tenantId">
                <option>Selecione</option>
                {tenants.filter(tenant =>
                  !user.TenantUser.find(tenantUser => tenantUser.tenantId === tenant.id)
                ).map(tenant => (
                  <option value={tenant.id}>{tenant.name}</option>
                ))}
              </select>
              <button type="submit" name="_action" value="add_tenant">Add to tenant</button>
            </Form>
          </li>
        ))}
      </ul>
    </main>
  );
}
