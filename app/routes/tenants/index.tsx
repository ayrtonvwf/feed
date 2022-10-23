import { Tenant } from "@prisma/client";
import { ActionFunction, DataFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  await prisma.$connect();
  const tenants = await prisma.tenant.findMany();
  await prisma.$disconnect();
  return json(tenants);
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  if (_action === 'create') {
    await prisma.$connect();
    await prisma.tenant.create({
      data: {
        name: body.get('name')?.toString() || 'Sem nome',
      }
    });
    await prisma.$disconnect();
    return redirect(`/tenants`);
  }

  if (_action === 'load') {
    const session = await getSession(request.headers.get("cookie"));
    session.set('tenantId', values.id);
    return redirect(`/tenants` , {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function Index() {
  const tenants = useLoaderData<Tenant[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Tenants</h1>
      <Form method="post">
        <input name="name" placeholder="Nome" required minLength={5}/>
        <button type="submit" name="_action" value="create">Create</button>
      </Form>
      <ul>
        {tenants.map(tenant => (
          <li key={tenant.id}>
            <Link to={`/tenant/${tenant.id}`}>{tenant.name}</Link>
            <Form method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={tenant.id} />
              <button type="submit" name="_action" value="load">Load</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
