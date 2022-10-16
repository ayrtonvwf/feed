import { Company, User } from "@prisma/client";
import { ActionFunction, DataFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  await prisma.$connect();
  const companies = await prisma.company.findMany();
  await prisma.$disconnect();
  return json(companies);
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  console.log({ _action, values });

  await prisma.$connect();
  if (_action === 'create') {
    await prisma.company.create({
      data: {
        name: body.get('name')?.toString() || 'Sem nome',
      }
    });
    return redirect(`/companies`);
  }

  if (_action === 'load') {
    const session = await getSession(request.headers.get("cookie"));
    session.set('companyId', values.id);
    return redirect(`/companies` , {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function Index() {
  const companies = useLoaderData<Company[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Empresas</h1>
      <Form method="post">
        <input name="name" placeholder="Nome" required minLength={5}/>
        <button type="submit" name="_action" value="create">Create</button>
      </Form>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name}
            <Form method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={company.id} />
              <button type="submit" name="_action" value="load">Load</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
