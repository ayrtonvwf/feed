import { LoaderArgs } from "@remix-run/cloudflare";
import {
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import {
  StandaloneComment,
  StandaloneCommentType,
} from "~/components/feed/standalone-comment";
import { MyH2 } from "~/components/typography/title";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<
  TypedJsonResponse<{ comments: StandaloneCommentType[] }>
> => {
  const sessionStorage = makeSession(context);
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const tenantId = session.get("tenantId")?.toString() || "";

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const comments = await prisma.comment.findMany({
    where: { userId: params.userId, Post: { Feed: { tenantId } } },
    include: { Post: { include: { Feed: true, User: true } }, User: true },
  });

  await prisma.$disconnect();

  return typedjson({ comments });
};

export default function () {
  const { comments } = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <MyH2>Comments</MyH2>
      {comments.map((comment) => (
        <StandaloneComment comment={comment} />
      ))}
    </div>
  );
}
