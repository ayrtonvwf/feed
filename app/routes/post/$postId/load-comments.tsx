import { LoaderArgs } from "@remix-run/cloudflare";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
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
  const [post, lastComment] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        User: true,
        Feed: true,
        Comment: {
          take: 3,
          skip: 1,
          include: { User: true },
          cursor: {
            id: after,
          },
          orderBy: { id: "asc" },
        },
      },
    }),
    prisma.comment.findFirst({
      where: { postId: params.postId },
      orderBy: { id: "desc" },
    }),
  ]);

  await prisma.$disconnect();

  if (!post) {
    throw new Error("Post not found");
  }

  return typedjson({ post, lastCommentId: lastComment?.id || null });
};

export type CommentLoaderData = typeof loader;
