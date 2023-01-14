import { LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { MyH1 } from "~/components/typography/title";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const loader = async ({ request, context }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId");
  if (typeof tenantId !== "string" || !tenantId) {
    return typedjson({ tenant: null });
  }

  await prisma.$connect();
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: { Feed: true },
  });
  await prisma.$disconnect();

  return typedjson({ tenant });
};

export default function Index() {
  const { tenant } = useTypedLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <MyH1>Bem vindo</MyH1>
      {tenant ? (
        <>
          <p>
            Você está logado no tenant <b>{tenant.name}</b>.
          </p>
          {tenant.Feed.length ? (
            <p>Escolha um feed para visualizar na parte superior da página.</p>
          ) : (
            <p>Ainda não há feeds cadastrados nesse tenant.</p>
          )}
        </>
      ) : (
        <>
          <p>Você não está logado em nenhum tenant.</p>
          <p>Aguarde um convite para conseguir utilizar a aplicação.</p>
        </>
      )}
    </main>
  );
}
