import { LoaderArgs } from "@remix-run/cloudflare";
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
import { MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<{ posts: StandalonePostType[] }>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId")?.toString() || "";

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const posts = await prisma.post.findMany({
    where: { userId: params.userId, Feed: { tenantId } },
    include: { Feed: true, User: true },
  });

  await prisma.$disconnect();

  return typedjson({ posts });
};

export default function () {
  const { posts } = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <MyH2>Posts</MyH2>
      {posts.map((post) => (
        <StandalonePost post={post} />
      ))}
    </div>
  );
}
