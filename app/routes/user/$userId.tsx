import { ErrorBoundaryComponent, json, redirect } from "@remix-run/cloudflare";
import type {
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import { Comment, Feed, Post, Tenant, TenantUser, User } from "@prisma/client";
import invariant from "tiny-invariant";
import { TypedResponse } from "@remix-run/react/dist/components";
import { authenticator } from "~/services/auth.server";
import { MyH1 } from "~/components/typography/title";

type UserWithDetails = User & {
  TenantUser: (TenantUser & { Tenant: Tenant })[],
  Post: (Post & { Feed: Feed })[],
  Comment: (Comment & { Post: (Post & { Feed: Feed }) })[],
}

type LoaderData = {
  user: UserWithDetails;
}

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      TenantUser: { include: { Tenant: true }},
      Post: { include: { Feed: true }},
      Comment: { include: { Post: { include: { Feed: true }}}},
    },
  });
  await prisma.$disconnect();
  if (!user) {
    throw new Error(`User não encontrado.`);
  }

  return json({ user });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div>
      <h2>Ah não!</h2>
      <h3>Algo de errado não está certo</h3>
      <div>{error.name} - {error.message}</div>
    </div>
  );
}

export default function () {
  const {user} = useLoaderData<LoaderData>();

  return (
    <main className="container mx-auto">
      <MyH1>{user.name}</MyH1>
      <h2>{user.email}</h2>
      <h3>Tenants</h3>
      <ul>
        {user.TenantUser.map(tenantUser => (
          <li key={tenantUser.id}>{tenantUser.Tenant.name}</li>
        ))}
      </ul>
      <h3>Posts</h3>
      <ul>
        {user.Post.map(post => (
          <li key={post.id}>{post.Feed.title} - {post.title}</li>
        ))}
      </ul>
      <h3>Comments</h3>
      <ul>
        {user.Comment.map(comment => (
          <li key={comment.id}>{comment.Post.Feed.title} - {comment.Post.title} - {comment.description}</li>
        ))}
      </ul>
    </main>
  );
}
