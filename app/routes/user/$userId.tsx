import { User } from "@prisma/client";
import { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import {
  typedjson,
  TypedJsonResponse,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { MyNavLink } from "~/components/header/link";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<{ user: User }>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
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

  return (
    <main className="container mx-auto">
      <Panel>
        <div>
          <MyH1>{user.name}</MyH1>
          <span>{user.email}</span>
        </div>
        <header className="flex">
          <MyNavLink to={`/user/${user.id}/posts`}>Posts</MyNavLink>
          <MyNavLink to={`/user/${user.id}/comments`}>Comments</MyNavLink>
        </header>
        <Outlet />
      </Panel>
    </main>
  );
}
