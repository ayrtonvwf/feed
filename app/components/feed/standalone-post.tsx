import { Feed, Post, User } from "@prisma/client";
import { Panel } from "../block/panel";
import { MyLink } from "../typography/link";

export type StandalonePostType = Post & { User: User; Feed: Feed };

const descriptionLimit = 100;

export const StandalonePost: React.FC<{ post: StandalonePostType }> = ({
  post,
}) => (
  <Panel key={post.id}>
    <div className="mb-5 flex flex-col gap-2">
      <div>
        <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>
        (on <MyLink to={`/feed/${post.Feed.id}`}>{post.Feed.title}</MyLink>)
        <span>{post.createdAt.toLocaleString()}</span>
        <MyLink to={`/post/${post.id}`}>Referência</MyLink>
      </div>
      <h3 className="font-bold">{post.title}</h3>
      <p>
        {post.description.substring(0, descriptionLimit) +
          (post.description.length > descriptionLimit ? "…" : "")}
      </p>
    </div>
  </Panel>
);
