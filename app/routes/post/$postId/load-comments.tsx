import { LoaderArgs } from "@remix-run/cloudflare";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  const sessionStorage = makeSession(context);
  await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(
    typeof params.postId === "string",
    `params.postId should be a string`
  );

  const url = new URL(request.url);
  const after = url.searchParams.get("after")?.toString();

  /**
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
   */
  await prisma.$connect();
  const comments = await prisma.comment.findMany({
    where: { postId: params.postId },
    take: 2,
    skip: 1, // Skip the cursor
    cursor: {
      id: after,
    },
    include: {
      User: true,
    },
    orderBy: { id: "desc" },
  });
  await prisma.$disconnect();

  return typedjson({ comments });
};
