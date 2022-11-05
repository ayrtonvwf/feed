import { Comment, Feed, Post, User } from "@prisma/client";
import { Panel } from "../block/panel";
import { MyLink } from "../typography/link";

export type StandaloneCommentType = Comment & {
  User: User;
  Post: Post & { User: User; Feed: Feed };
};

const descriptionLimit = 100;

export const StandaloneComment: React.FC<{
  comment: StandaloneCommentType;
}> = ({ comment }) => (
  <Panel key={comment.id}>
    <div className="mb-5 flex flex-col gap-2">
      <div>
        <MyLink to={`/user/${comment.User.id}`}>{comment.User.name}</MyLink>
        <span>{comment.createdAt.toLocaleString()}</span>
        <MyLink to={`/post/${comment.Post.id}?comment=${comment.id}`}>
          Referência
        </MyLink>
      </div>
      <p>
        {comment.description.substring(0, descriptionLimit) +
          (comment.description.length > descriptionLimit ? "…" : "")}
      </p>
      <div>
        <MyLink to={`/post/${comment.Post.id}`}>{comment.Post.title}</MyLink>
        (from{" "}
        <MyLink to={`/user/${comment.Post.User.id}`}>
          {comment.Post.User.name}
        </MyLink>
        ) (on{" "}
        <MyLink to={`/feed/${comment.Post.Feed.id}`}>
          {comment.Post.Feed.title}
        </MyLink>
        )
      </div>
    </div>
  </Panel>
);
