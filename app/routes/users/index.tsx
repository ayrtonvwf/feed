import { User } from "@prisma/client";
import { ActionFunction, DataFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { hash } from "~/services/hash.server";
import { prisma } from "~/services/prisma.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  await prisma.$connect();
  const users = await prisma.user.findMany();
  await prisma.$disconnect();
  return json(users);
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const email = body.get('email')?.toString() || 'sem@email.com';
  const password = body.get('password')?.toString() || 'Mudar123';

  await prisma.$connect();
  const existing = await prisma.user.findFirst({
    where: { email },
  });
  if (existing) {
    await prisma.$disconnect();
    throw new Error('User already exists');
  }

  const user = await prisma.user.create({
    data: {
      name: body.get('name')?.toString() || 'Sem título',
      email: body.get('email')?.toString() || 'sem@email.com',
      passwordHash: await hash({ password }),
    }
  });
  await prisma.$disconnect();

  return redirect(`/users`);
};

export default function Index() {
  const users = useLoaderData<User[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Users</h1>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
