import { User } from "@prisma/client";
import {
  ActionFunction,
  DataFunctionArgs,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Panel } from "~/components/block/panel";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { hash } from "~/services/hash.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const email = body.get("email")?.toString() || "sem@email.com";
  const password = body.get("password")?.toString() || "Mudar123";

  await prisma.$connect();
  const existing = await prisma.user.findFirst({
    where: { email },
  });
  if (existing) {
    await prisma.$disconnect();
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      id: ulid(),
      name: body.get("name")?.toString() || "Sem título",
      email: body.get("email")?.toString() || "sem@email.com",
      passwordHash: await hash({ password }),
    },
  });
  await prisma.$disconnect();

  return redirect(`/login`);
};

export default function Index() {
  return (
    <main className="container mx-auto">
      <MyH1>
        Crie aqui agora mesmo a sua nova conta para você estar usando esse
        maravilhoso sistema de feed
      </MyH1>
      <Panel>
        <Form method="post">
          <fieldset className="flex flex-col gap-2">
            <input
              name="name"
              placeholder="Nome"
              required
              minLength={5}
              className="block w-full rounded-lg bg-gray-200 p-2"
            />
            <input
              name="email"
              placeholder="E-mail"
              required
              minLength={5}
              type="email"
              className="block w-full rounded-lg bg-gray-200 p-2"
            />
            <input
              name="password"
              placeholder="Senha"
              required
              minLength={5}
              type="password"
              className="block w-full rounded-lg bg-gray-200 p-2"
            />
            <button
              type="submit"
              className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
            >
              Sign up
            </button>
          </fieldset>
        </Form>
      </Panel>
    </main>
  );
}
