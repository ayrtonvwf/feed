import { Feed, Post, User } from "@prisma/client";
import { Panel } from "../block/panel";
import { DateTime } from "../typography/date-time";
import { MyLink } from "../typography/link";

export type StandalonePostType = Post & { User: User; Feed: Feed };

const descriptionLimit = 100;

export const StandalonePost: React.FC<{ post: StandalonePostType }> = ({
  post,
}) => (
  <Panel key={post.id} className="border-[1px] border-solid border-gray-300">
    <div>
      <div className="flex gap-2">
        <div>
          <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink> postou
          em <MyLink to={`/feed/${post.Feed.id}`}>{post.Feed.title}</MyLink>
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
    </div>
  </Panel>
);
