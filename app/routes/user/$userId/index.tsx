import { LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { DateTime } from "~/components/typography/date-time";
import { MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.userId, `params.userId is required`);

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId")?.toString() || "";

  await prisma.$connect();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
    include: {
      _count: {
        select: {
          Post: { where: { Feed: { tenantId } } },
          Comment: { where: { Post: { Feed: { tenantId } } } },
        },
      },
    },
  });

  await prisma.$disconnect();

  return typedjson({ user });
};

export default function () {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <MyH2>Sobre</MyH2>
      <hr />
      <p>
        <b>Cadastrado em:</b> <DateTime>{user.createdAt}</DateTime>
      </p>
      <p>
        <b>Posts:</b> {user._count.Post}
      </p>
      <p>
        <b>Comentários:</b> {user._count.Comment}
      </p>
    </div>
  );
}
