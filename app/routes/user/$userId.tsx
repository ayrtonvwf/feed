import { User } from "@prisma/client";
import { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/cloudflare";
import { useState } from "react";
import {
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import {
  StandaloneComment,
  StandaloneCommentType,
} from "~/components/feed/standalone-comment";
import {
  StandalonePost,
  StandalonePostType,
} from "~/components/feed/standalone-post";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";

type UserWithDetails = User & {
  Post: StandalonePostType[];
  Comment: StandaloneCommentType[];
};

type LoaderData = {
  user: UserWithDetails;
};

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId")?.toString() || "";

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
    include: {
      Post: {
        include: { Feed: true, User: true },
        where: { Feed: { tenantId } },
      },
      Comment: {
        include: {
          Post: { include: { Feed: true, User: true } },
          User: true,
        },
        where: { Post: { Feed: { tenantId } } },
      },
    },
  });

  await prisma.$disconnect();

  return typedjson({ user });
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

const TabButton: React.FC<
  React.HTMLProps<HTMLButtonElement> & { active: boolean }
> = (props) => (
  /**
   * @todo pass props to button with spread operator
   */
  <button
    className={`block w-1/2 rounded-t-lg border-b-4 border-solid px-4 py-2 text-blue-600 ${
      props.active
        ? "border-sky-500 bg-sky-100"
        : "border-slate-200 bg-slate-100"
    }`}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default function () {
  const { user } = useTypedLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");

  return (
    <main className="container mx-auto">
      <Panel>
        <div className="flex">
          <div className="w-full">
            <MyH1>{user.name}</MyH1>
            <span>{user.email}</span>
          </div>
        </div>
      </Panel>
      <Panel>
        <header className="flex">
          <TabButton
            active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </TabButton>
          <TabButton
            active={activeTab === "comments"}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </TabButton>
        </header>
        <div className={activeTab === "posts" ? "block" : "hidden"}>
          <MyH2>Posts</MyH2>
          {user.Post.map((post) => (
            <StandalonePost post={post} />
          ))}
        </div>
        <div className={activeTab === "comments" ? "block" : "hidden"}>
          <MyH2>Comments</MyH2>
          <ul>
            {user.Comment.map((comment) => (
              <StandaloneComment comment={comment} />
            ))}
          </ul>
        </div>
      </Panel>
    </main>
  );
}
