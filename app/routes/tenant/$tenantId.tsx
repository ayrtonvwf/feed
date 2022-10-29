import { ErrorBoundaryComponent, json, redirect } from "@remix-run/cloudflare";
import type {
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import { Feed, Post, Tenant } from "@prisma/client";
import invariant from "tiny-invariant";
import { TypedResponse } from "@remix-run/react/dist/components";
import { authenticator } from "~/services/auth.server";
import { MyH1, MyH2 } from "~/components/typography/title";
import { Panel } from "~/components/block/panel";

type LoaderData = {
  feeds: Feed[];
  tenant: Tenant;
}

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect('/');
  }

  invariant(params.tenantId, `params.tenantId is required`);

  await prisma.$connect();
  const tenant = await prisma.tenant.findUnique({
    where: { id: params.tenantId },
    include: { Feed: true },
  });
  await prisma.$disconnect();
  if (!tenant) {
    throw new Error(`Tenant não encontrado.`);
  }

  return json({ tenant, feeds: tenant.Feed });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div>
      <h2>Ah não!</h2>
      <h3>Algo de errado não está certo</h3>
      <div>{error.name} - {error.message}</div>
    </div>
  );
}

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect('/');
  }

  invariant(params.tenantId, `params.tenantId is required`);

  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  if (_action === 'createFeed') {
    await prisma.$connect();
    await prisma.feed.create({
      data: {
        title: values.title?.toString() || 'Sem título',
        tenantId: params.tenantId,
      }
    });
    await prisma.$disconnect();
    return redirect(`/tenant/${params.tenantId}`);
  }

  return redirect(`/tenant/${params.tenantId}`);
};

export default function () {
  const {tenant, feeds} = useLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <MyH1>{tenant.name}</MyH1>
      <Panel>
        <Form method="post">
          <fieldset className="gap-2 flex flex-col">
            <MyH2>Criar feed</MyH2>
            <input name="title" placeholder="Título" required minLength={5} className="block rounded-lg w-full bg-gray-200 p-2" />
            <button type="submit" name="_action" value="createFeed" className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md">Criar</button>
          </fieldset>
        </Form>
      </Panel>
      <Panel>
        <MyH2>Feeds existentes</MyH2>
        {feeds.map((feed) => <>
          <div>
            <h3>{feed.title}</h3>
          </div>
        </>)}
      </Panel>
    </main>
  );
}
