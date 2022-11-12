import { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/cloudflare";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { DateTime } from "~/components/typography/date-time";
import { MyLink } from "~/components/typography/link";
import { getAuth } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { makeSession } from "~/services/session.server";

export const loader = async ({ request, context, params }: LoaderArgs) => {
  const sessionStorage = makeSession(context);
  await getAuth(sessionStorage).isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.postId, `params.postId is required`);

  await prisma.$connect();

  const post = await prisma.post.findUniqueOrThrow({
    where: { id: params.postId },
    include: {
      User: true,
      Feed: true,
      Comment: { take: 5, include: { User: true } },
    },
  });

  await prisma.$disconnect();

  return typedjson({ post });
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
  const { post } = useTypedLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <Panel
        key={post.id}
        className="border-[1px] border-solid border-gray-300"
      >
        <div>
          <div className="flex gap-2">
            <div>
              <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>{" "}
              postou em{" "}
              <MyLink to={`/feed/${post.Feed.id}`}>{post.Feed.title}</MyLink>
            </div>
            <div>|</div>
            <DateTime>{post.createdAt}</DateTime>
            <MyLink to={`/post/${post.id}`}>#ref</MyLink>
          </div>
          <hr className="my-2" />
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.description}</p>
        </div>
        <div>
          {post.Comment.map((comment) => (
            <Panel key={comment.id}>
              <div className="flex">
                <MyLink to={`/user/${comment.User.id}`}>
                  {comment.User.name}
                </MyLink>{" "}
                <DateTime>{comment.createdAt}</DateTime>
                <MyLink to={`/post/${post.id}?comment=${comment.id}`}>
                  #ref
                </MyLink>
              </div>
              <p>{comment.description}</p>
            </Panel>
          ))}
        </div>
      </Panel>
    </main>
  );
}
