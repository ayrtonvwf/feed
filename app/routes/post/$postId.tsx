import { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/node";
import { FetcherWithComponents } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  typedjson,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { UseDataFunctionReturn } from "remix-typedjson/dist/remix";
import { ValidatedForm } from "remix-validated-form";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { Spinner } from "~/components/block/spinner";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyTextarea } from "~/components/form/textarea";
import { DateTime } from "~/components/typography/date-time";
import { MyLink } from "~/components/typography/link";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import {
  commentValidator,
  CreateCommentAction,
} from "./$postId/create-comment";
import { CommentLoaderData } from "./$postId/load-comments";
import { mergeComments, PostState } from "./$postId/post-utils";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.postId, `params.postId is required`);

  await prisma.$connect();

  const [post, lastComment] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        User: true,
        Feed: true,
        Comment: { take: 3, include: { User: true }, orderBy: { id: "asc" } },
        _count: { select: { Comment: true } },
      },
    }),
    prisma.comment.findFirst({
      where: { postId: params.postId },
      orderBy: { id: "desc" },
    }),
  ]);

  if (!post) {
    throw new Error("Post not found");
  }

  await prisma.$disconnect();

  return typedjson({ post, lastCommentId: lastComment?.id || null });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div>
      <h2>Ah não!</h2>
      <h3>Algo de errado não está certo</h3>
      <div>
        {error.name} - {error.message}
      </div>
    </div>
  );
};

const loaderDataToPostState = (
  loaderData: UseDataFunctionReturn<typeof loader>
): PostState => ({
  data: loaderData.post,
  createdComments: [],
  loadedComments: loaderData.post.Comment,
  thirdPartyComments: loaderData.post.Comment,
  lastLoadedCommentId:
    loaderData.post.Comment[loaderData.post.Comment.length - 1]?.id || null,
  lastCommentIdToLoad: loaderData.lastCommentId,
});

export default function () {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [post, setPost] = useState<PostState>(
    loaderDataToPostState(loaderData)
  );

  const [shouldFetchMore, setShouldFetchMore] = useState(
    post.lastCommentIdToLoad &&
      post.lastCommentIdToLoad !== post.lastLoadedCommentId
  );
  const moreComments = useTypedFetcher<CommentLoaderData>();

  useEffect(() => {
    /**
     * @see https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
     */
    if (!moreComments.data) {
      return;
    }

    /**
     * @todo handle better the lastLoadedCommentId/lastCommentIdToLoad interaction with the createdComments ids
     */
    const loadedComments = mergeComments(
      post.loadedComments,
      moreComments.data.post.Comment
    );
    const thirdPartyComments = mergeComments(
      post.thirdPartyComments,
      moreComments.data.post.Comment,
      post.createdComments.map((c) => c.id)
    );
    const lastLoadedCommentId =
      loadedComments[loadedComments.length - 1]?.id || null;
    setPost({
      ...post,
      loadedComments: loadedComments,
      thirdPartyComments,
      lastLoadedCommentId,
      lastCommentIdToLoad: moreComments.data.lastCommentId,
    });
    setShouldFetchMore(
      moreComments.data.lastCommentId &&
        moreComments.data.lastCommentId !== lastLoadedCommentId
    );
  }, [moreComments.data]);

  const endOfCommentsInView = useInView();

  useEffect(() => {
    if (
      !endOfCommentsInView.inView ||
      !shouldFetchMore ||
      moreComments.state !== "idle"
    ) {
      return;
    }
    moreComments.submit(
      post.lastLoadedCommentId ? { after: post.lastLoadedCommentId } : null,
      { method: "get", action: `/post/${post.data.id}/load-comments` }
    );
  }, [endOfCommentsInView.inView, moreComments.data, shouldFetchMore]);

  useEffect(() => {
    if (post?.data.id !== loaderData?.post.id) {
      setPost(loaderDataToPostState(loaderData));
    }
  }, [loaderData]);

  const commentSubmiter = useTypedFetcher<CreateCommentAction>();
  useEffect(() => {
    if (!commentSubmiter?.data) {
      return;
    }
    setPost({
      ...post,
      createdComments: mergeComments(post.createdComments, [
        commentSubmiter.data.createdComment,
      ]),
      lastCommentIdToLoad: commentSubmiter.data.createdComment.id,
    });
    setShouldFetchMore(true);
  }, [commentSubmiter.data]);

  return (
    <main className="container mx-auto">
      <Panel
        key={post.data.id}
        className="border-[1px] border-solid border-gray-300"
      >
        <div>
          <div className="flex gap-2">
            <div>
              <MyLink to={`/user/${post.data.User.id}`}>
                {post.data.User.name}
              </MyLink>{" "}
              postou em{" "}
              <MyLink to={`/feed/${post.data.Feed.id}`}>
                {post.data.Feed.title}
              </MyLink>
            </div>
            <div>|</div>
            <DateTime>{post.data.createdAt}</DateTime>
            <MyLink to={`/post/${post.data.id}`}>#ref</MyLink>
          </div>
          <hr className="my-2" />
          <h3 className="font-bold">{post.data.title}</h3>
          <p>{post.data.description}</p>
        </div>
        <div>
          <ValidatedForm
            resetAfterSubmit
            validator={commentValidator}
            className="flex flex-col gap-2"
            method="post"
            action={`/post/${post.data.id}/create-comment`}
            fetcher={commentSubmiter as FetcherWithComponents<never>}
          >
            <MyTextarea name="description" label="Comentário" />
            <MySubmitButton />
          </ValidatedForm>
          {post.createdComments.map((comment) => (
            <Panel key={comment.id}>
              <div className="flex">
                <MyLink to={`/user/${comment.User.id}`}>
                  {comment.User.name}
                </MyLink>{" "}
                <DateTime>{comment.createdAt}</DateTime>
                <MyLink to={`/post/${post.data.id}?comment=${comment.id}`}>
                  #ref
                </MyLink>
              </div>
              <p>
                <b>{comment.description}</b>
              </p>
            </Panel>
          ))}
          {post.thirdPartyComments.map((comment) => (
            <Panel key={comment.id}>
              <div className="flex">
                <MyLink to={`/user/${comment.User.id}`}>
                  {comment.User.name}
                </MyLink>{" "}
                <DateTime>{comment.createdAt}</DateTime>
                <MyLink to={`/post/${post.data.id}?comment=${comment.id}`}>
                  #ref
                </MyLink>
              </div>
              <p>{comment.description}</p>
            </Panel>
          ))}
          <div
            ref={endOfCommentsInView.ref}
            className="flex justify-center items-center py-10"
          >
            {shouldFetchMore ? (
              <Spinner />
            ) : (
              <p>Não há mais comentários para carregar.</p>
            )}
          </div>
        </div>
      </Panel>
    </main>
  );
}
