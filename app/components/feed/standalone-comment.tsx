import { Comment, Feed, Post, User } from "@prisma/client";
import { Panel } from "../block/panel";
import { DateTime } from "../typography/date-time";
import { MyLink } from "../typography/link";
import { StandalonePost } from "./standalone-post";

export type StandaloneCommentType = Comment & {
  User: User;
  Post: Post & { User: User; Feed: Feed };
};

const descriptionLimit = 100;

export const StandaloneComment: React.FC<{
  comment: StandaloneCommentType;
}> = ({ comment }) => (
  <Panel key={comment.id} className="border-[1px] border-solid border-gray-300">
    <div className="flex gap-2">
      <div>
        <MyLink to={`/user/${comment.User.id}`}>{comment.User.name}</MyLink>{" "}
        comentou
      </div>
      <div>|</div>
      <DateTime>{comment.createdAt}</DateTime>
      <MyLink to={`/post/${comment.Post.id}?comment=${comment.id}`}>
        #ref
      </MyLink>
    </div>
    <hr className="my-2" />
    <p>
      {comment.description.substring(0, descriptionLimit) +
        (comment.description.length > descriptionLimit ? "…" : "")}
    </p>
    <StandalonePost post={comment.Post} />
  </Panel>
);
