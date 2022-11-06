import { Tenant } from "@prisma/client";
import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/cloudflare";
import { Form, useTransition } from "@remix-run/react";
import { RefObject, useEffect, useRef } from "react";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import { Panel } from "~/components/block/panel";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

type TenantWithCounters = Tenant & {
  _count: {
    Feed: number;
    TenantUser: number;
  };
};

type LoaderData = {
  tenants: TenantWithCounters[];
};

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  await prisma.$connect();
  const tenants = await prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          TenantUser: true,
          Feed: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return typedjson({ tenants });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  if (_action === "create") {
    await prisma.$connect();

    await prisma.tenant.create({
      data: {
        id: ulid(),
        name: values.name?.toString() || "Sem nome",
      },
    });
    await prisma.$disconnect();

    return redirect(`/admin/tenants`);
  }
};

export default function Index() {
  const { tenants } = useTypedLoaderData<LoaderData>();
  const transition = useTransition();

  const isCreating =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "create";
  const formRef = useRef() as RefObject<HTMLFormElement>;
  useEffect(() => {
    if (!isCreating) {
      formRef.current?.reset();
    }
  }, [isCreating]);

  return (
    <main className="container mx-auto">
      <MyH1>Tenants</MyH1>
      <Panel>
        <Form method="post" ref={formRef}>
          <fieldset className="flex flex-col gap-2">
            <MyH2>Criar tenant</MyH2>
            <input
              name="name"
              placeholder="Nome"
              required
              minLength={5}
              className="block w-full rounded-lg bg-gray-200 p-2"
            />
            <button
              type="submit"
              name="_action"
              value="create"
              className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
            >
              Create
            </button>
          </fieldset>
        </Form>
      </Panel>
      <Panel>
        <MyH2>Tenants existentes</MyH2>
        <ul>
          {tenants.map((tenant) => (
            <li key={tenant.id} className="py-1">
              {tenant.name} ({tenant._count.Feed} feeds,{" "}
              {tenant._count.TenantUser} users)
            </li>
          ))}
        </ul>
      </Panel>
    </main>
  );
}
