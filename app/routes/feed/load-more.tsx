import { LoaderArgs } from "@remix-run/cloudflare";
import { typedjson, TypedJsonResponse } from "remix-typedjson";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { FeedLoaderData } from "./types";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<FeedLoaderData>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);
  const after = url.searchParams.get("after")?.toString();
  const feedId = url.searchParams.get("feedId")?.toString();

  /**
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
   */
  await prisma.$connect();
  const feed = await prisma.feed.findUnique({
    where: { id: feedId },
    include: {
      Post: {
        take: 2,
        skip: 1, // Skip the cursor
        cursor: {
          id: after,
        },
        include: {
          User: true,
          Comment: { include: { User: true }, orderBy: { id: "asc" } },
        },
        orderBy: { id: "desc" },
      },
    },
  });
  await prisma.$disconnect();

  if (!feed) {
    throw new Error("Feed not found");
  }

  return typedjson({ feed });
};
