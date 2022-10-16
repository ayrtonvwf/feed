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

type LoaderData = {
  feeds: Feed[];
  tenant: Tenant;
}

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
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
    <div>
      <h1>{tenant.name}</h1>
      <Form method="post">
        <h2>Criar feed</h2>
        <input name="title" placeholder="Título" required minLength={5}/>
        <button type="submit" name="_action" value="createFeed">Criar</button>
      </Form>
      {feeds.map((feed) => <>
        <div>
          <h3>{feed.title}</h3>
        </div>
      </>)}
    </div>
  );
}
