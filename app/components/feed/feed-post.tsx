import { Comment, Feed, Post, User } from "@prisma/client";
import { FetcherWithComponents } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import { ValidatedForm } from "remix-validated-form";
import {
  commentValidator,
  CreateCommentAction,
} from "~/routes/post/$postId/create-comment";
import { CommentLoaderData } from "~/routes/post/$postId/load-comments";
import { mergeComments, PostState } from "~/routes/post/$postId/post-utils";
import { Panel } from "../block/panel";
import { MySubmitButton } from "../form/submit-button";
import { MyTextarea } from "../form/textarea";
import { DateTime } from "../typography/date-time";
import { MyLink } from "../typography/link";

export type FeedPostType = Post & {
  _count: { Comment: number };
  User: User;
  Feed: Feed;
  Comment: (Comment & { User: User })[];
};

type PropsType = { post: FeedPostType };

const descriptionLimit = 100;

const propsDataToPostState = (propsData: PropsType): PostState => ({
  data: propsData.post,
  createdComments: [],
  loadedComments: propsData.post.Comment,
  thirdPartyComments: propsData.post.Comment,
  lastLoadedCommentId:
    propsData.post.Comment[propsData.post.Comment.length - 1]?.id || null,
  lastCommentIdToLoad: null,
});

export const FeedPost: React.FC<PropsType> = (props) => {
  const [post, setPost] = useState<PostState>(propsDataToPostState(props));

  /**
   * @todo improve shouldFetchMore logic
   */
  const [shouldFetchMore, setShouldFetchMore] = useState(
    !post.lastCommentIdToLoad ||
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
      !!moreComments.data.lastCommentId &&
        moreComments.data.lastCommentId !== lastLoadedCommentId
    );
  }, [moreComments.data]);

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
    <Panel
      key={post.data.id}
      className="border-[1px] border-solid border-gray-300"
    >
      <div>
        <div className="flex gap-2">
          <div>
            <MyLink to={`/user/${post.data.User.id}`}>
              {post.data.User.name}
            </MyLink>
          </div>
          <div>|</div>
          <DateTime>{post.data.createdAt}</DateTime>
          <MyLink to={`/post/${post.data.id}`}>#ref</MyLink>
        </div>
        <hr className="my-2" />
        <h3 className="font-bold">{post.data.title}</h3>
        <p>
          {post.data.description.substring(0, descriptionLimit) +
            (post.data.description.length > descriptionLimit ? "…" : "")}
        </p>
        <hr />
        <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2" key={comment.id}>
              <div>
                <MyLink to={`/user/${comment.User.id}`}>
                  {comment.User.name}
                </MyLink>
                <span>{comment.createdAt.toLocaleString()}</span>
              </div>
              <p>
                <b>{comment.description}</b>
              </p>
            </div>
          ))}
          {post.thirdPartyComments.map((comment) => (
            <div className="flex flex-col gap-2" key={comment.id}>
              <div>
                <MyLink to={`/user/${comment.User.id}`}>
                  {comment.User.name}
                </MyLink>
                <span>{comment.createdAt.toLocaleString()}</span>
              </div>
              <p>{comment.description}</p>
            </div>
          ))}
          <div className="flex justify-center items-center py-10">
            {shouldFetchMore ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (moreComments.state !== "idle") {
                    return;
                  }
                  moreComments.submit(
                    post.lastLoadedCommentId
                      ? { after: post.lastLoadedCommentId }
                      : null,
                    {
                      method: "get",
                      action: `/post/${post.data.id}/load-comments`,
                    }
                  );
                }}
              >
                {moreComments.state !== "idle"
                  ? "Carregando comentários..."
                  : "Carregar mais comentários"}
              </button>
            ) : (
              <p>Não há mais comentários para carregar.</p>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};
