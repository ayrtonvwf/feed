import {
  ActionFunction,
  DataFunctionArgs,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { ulid } from "ulid";
import { z } from "zod";
import { Panel } from "~/components/block/panel";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { hash } from "~/services/hash.server";
import { prisma } from "~/services/prisma.server";
import { commitSession, getSession } from "~/services/session.server";

export const validator = withZod(
  z.object({
    name: z.string().min(5, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(6, { message: "Password should have at least 6 characters" }),
  })
);

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
  const validated = await validator.validate(await request.clone().formData());

  if (validated.error) {
    // validationError comes from `remix-validated-form`
    return validationError(validated.error, validated.data);
  }

  await prisma.$connect();
  const existing = await prisma.user.findFirst({
    where: { email: validated.data.email },
  });
  if (existing) {
    await prisma.$disconnect();
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      id: ulid(),
      name: validated.data.name,
      email: validated.data.email,
      passwordHash: await hash({ password: validated.data.password }),
    },
  });

  const tenant = await prisma.tenant.create({
    data: {
      id: ulid(),
      name: `${user.name}'s Tenant`,
      TenantUser: {
        create: {
          id: ulid(),
          userId: user.id,
          type: "MANAGER",
        },
      },
      Feed: {
        create: {
          id: ulid(),
          title: `Default Feed`,
          Post: {
            create: {
              id: ulid(),
              title: `Welcome to ${user.name}'s Tenant`,
              description: `This is the first post of the whole Tenant. Feel free to explore! (automatically generated)`,
              userId: user.id,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  /**
   * I would rather create a custom auth strategy but it looks like the Strategy
   * class will only get the request object and not the user entity directly so
   * I guess we have to bypass it as shown in the docs.
   *
   * @see https://github.com/sergiodxa/remix-auth#custom-redirect-url-based-on-the-user
   */
  const session = await getSession(request.headers.get("cookie"));
  session.set("tenantId", tenant.id);
  session.set(authenticator.sessionKey, user);

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Index() {
  return (
    <main className="container mx-auto">
      <MyH1>
        Crie aqui agora mesmo a sua nova conta para você estar usando esse
        maravilhoso sistema de feed
      </MyH1>
      <Panel>
        <ValidatedForm validator={validator} method="post">
          <fieldset className="flex flex-col gap-2">
            <MyInput name="name" label="Nome" />
            <MyInput name="email" label="E-mail" type="email" />
            <MyInput name="password" label="Senha" type="password" />
            <MySubmitButton />
          </fieldset>
        </ValidatedForm>
      </Panel>
    </main>
  );
}
