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
    comments: StandaloneCommentType[];
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
  const comments = await prisma.comment.findMany({
    where: { userId: params.userId, Post: { Feed: { tenantId } } },
    include: { Post: { include: { Feed: true, User: true } }, User: true },
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

  return typedjson({ comments, userId: params.userId, after, prevAfter });
};

export default function () {
  const { comments, userId, after, prevAfter } =
    useTypedLoaderData<typeof loader>();

  const nextPageUrl = comments.length
    ? `/user/${userId}/comments?after=${comments[comments.length - 1].id}` +
      (after ? `&prevAfter=${after}` : "")
    : null;
  const prevPageUrl = after
    ? `/user/${userId}/comments` + (prevAfter ? `?after=${prevAfter}` : "")
    : null;

  return (
    <div>
      <MyH2>Comments</MyH2>
      <hr />
      {prevPageUrl && <MyLink to={prevPageUrl}>{"<-"} Mais recentes</MyLink>}
      {comments.map((comment) => (
        <StandaloneComment comment={comment} />
      ))}
      {nextPageUrl ? (
        <MyLink to={nextPageUrl}>Mais antigos {"->"}</MyLink>
      ) : (
        <div>Não há comentários mais antigos</div>
      )}
    </div>
  );
}
