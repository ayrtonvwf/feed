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
          <MyNavLink to={`/user/${user.id}`}>Sobre</MyNavLink>
          <MyNavLink to={`/user/${user.id}/posts`}>Posts</MyNavLink>
          <MyNavLink to={`/user/${user.id}/comments`}>Comments</MyNavLink>
        </header>
        <Outlet />
      </Panel>
    </main>
  );
}
