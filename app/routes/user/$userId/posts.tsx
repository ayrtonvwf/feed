import { LoaderArgs } from "@remix-run/node";
import {
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import {
  StandalonePost,
  StandalonePostType,
} from "~/components/feed/standalone-post";
import { MyLink } from "~/components/typography/link";
import { MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<
  TypedJsonResponse<{
    posts: StandalonePostType[];
    userId: string;
    after?: string;
    prevAfter?: string;
  }>
> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId")?.toString() || "";

  invariant(params.userId, `params.userId is required`);

  const url = new URL(request.url);
  const after = url.searchParams.get("after")?.toString();
  const prevAfter = url.searchParams.get("prevAfter")?.toString();

  await prisma.$connect();
  const posts = await prisma.post.findMany({
    where: { userId: params.userId, Feed: { tenantId } },
    include: { Feed: true, User: true },
    take: 2,
    skip: after ? 1 : 0,
    cursor: after
      ? {
          id: after,
        }
      : undefined,
    orderBy: { id: "desc" },
  });

  await prisma.$disconnect();

  return typedjson({ posts, userId: params.userId, after, prevAfter });
};

export default function () {
  const { posts, userId, after, prevAfter } =
    useTypedLoaderData<typeof loader>();

  const nextPageUrl = posts.length
    ? `/user/${userId}/posts?after=${posts[posts.length - 1].id}` +
      (after ? `&prevAfter=${after}` : "")
    : null;
  const prevPageUrl = after
    ? `/user/${userId}/posts` + (prevAfter ? `?after=${prevAfter}` : "")
    : null;

  return (
    <div>
      <MyH2>Posts</MyH2>
      <hr />
      {prevPageUrl && <MyLink to={prevPageUrl}>{"<-"} Mais recentes</MyLink>}
      {posts.map((post) => (
        <StandalonePost post={post} />
      ))}
      {nextPageUrl ? (
        <MyLink to={nextPageUrl}>Mais antigos {"->"}</MyLink>
      ) : (
        <div>Não há posts mais antigos</div>
      )}
    </div>
  );
}
