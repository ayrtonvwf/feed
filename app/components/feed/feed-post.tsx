import { Comment, Post, User } from "@prisma/client";
import { ValidatedForm } from "remix-validated-form";
import { commentValidator } from "~/routes/feed/$feedId";
import { Panel } from "../block/panel";
import { MySubmitButton } from "../form/submit-button";
import { MyTextarea } from "../form/textarea";
import { DateTime } from "../typography/date-time";
import { MyLink } from "../typography/link";

export type FeedPostType = Post & {
  User: User;
  Comment: (Comment & { User: User })[];
};

const descriptionLimit = 100;

export const FeedPost: React.FC<{ post: FeedPostType }> = ({ post }) => {
  // const commentSubmiter = useFetcher<never>();
  /**
   * @todo make it submit a comment with the fetcher
   */

  return (
    <Panel key={post.id} className="border-[1px] border-solid border-gray-300">
      <div>
        <div className="flex gap-2">
          <div>
            <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>
          </div>
          <div>|</div>
          <DateTime>{post.createdAt}</DateTime>
          <MyLink to={`/post/${post.id}`}>#ref</MyLink>
        </div>
        <hr className="my-2" />
        <h3 className="font-bold">{post.title}</h3>
        <p>
          {post.description.substring(0, descriptionLimit) +
            (post.description.length > descriptionLimit ? "…" : "")}
        </p>
        <hr />
        <div className="flex flex-col gap-2">
          <ValidatedForm
            validator={commentValidator}
            className="flex flex-col gap-2"
            method="post"
            resetAfterSubmit
            action={`/post/${post.id}/create-comment`}
            // fetcher={commentSubmiter}
          >
            <MyTextarea name="description" label="Comentário" />
            <MySubmitButton />
          </ValidatedForm>
          {post.Comment.map((comment) => (
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
        </div>
      </div>
    </Panel>
  );
};
