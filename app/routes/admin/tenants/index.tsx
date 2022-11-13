import { Tenant } from "@prisma/client";
import {
  ActionFunction,
  DataFunctionArgs,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import {
  redirect,
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Panel } from "~/components/block/panel";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const validator = withZod(
  z.object({
    name: z.string().min(5, { message: "Name is required" }),
  })
);

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
  const validated = await validator.validate(await request.clone().formData());

  if (validated.error) {
    // validationError comes from `remix-validated-form`
    return validationError(validated.error, validated.data);
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  await prisma.$connect();

  await prisma.tenant.create({
    data: {
      id: ulid(),
      name: validated.data.name,
    },
  });
  await prisma.$disconnect();

  return redirect(`/admin/tenants`);
};

export default function Index() {
  const { tenants } = useTypedLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <MyH1>Tenants</MyH1>
      <Panel>
        <ValidatedForm validator={validator} method="post" resetAfterSubmit>
          <fieldset className="flex flex-col gap-2">
            <MyH2>Criar tenant</MyH2>
            <MyInput name="name" label="Nome" />
            <MySubmitButton />
          </fieldset>
        </ValidatedForm>
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
