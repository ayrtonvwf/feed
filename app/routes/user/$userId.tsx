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
import { MyH1, MyH2, MyH3 } from "~/components/typography/title";
import { Panel } from "~/components/block/panel";
import { useState } from "react";

type UserWithDetails = User & {
  TenantUser: (TenantUser & { Tenant: Tenant })[],
  Post: (Post & { Feed: Feed })[],
  Comment: (Comment & { Post: (Post & { Feed: Feed }) })[],
}

type LoaderData = {
  user: UserWithDetails;
  tenantsWithoutUser: Tenant[];
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
  const [user, tenantsWithoutUser] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.userId },
      include: {
        TenantUser: { include: { Tenant: true }},
        Post: { include: { Feed: true }},
        Comment: { include: { Post: { include: { Feed: true }}}},
      },
    }),
    prisma.tenant.findMany({
      where: {
        NOT: {
          TenantUser: {
            some: {
              userId: params.userId,
            },
          },
        },
      },
    })
  ]);

  await prisma.$disconnect();
  if (!user) {
    throw new Error(`User não encontrado.`);
  }

  return json({ user, tenantsWithoutUser });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();

  if (_action === 'add_tenant') {
    await prisma.tenantUser.create({
      data: {
        tenantId: values.tenantId?.toString() || 'undefined-tenant',
        userId: params.userId,
      }
    });
  }
  await prisma.$disconnect();

  return redirect(`/user/${params.userId}`);
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

const TabButton: React.FC<React.HTMLProps<HTMLButtonElement> & { active: boolean }> = (props) => (
  /**
   * @todo pass props to button with spread operator
   */
  <button
    className={`block px-4 py-2 text-blue-600 rounded-t-lg w-1/2 border-b-4 border-solid ${props.active ? "border-sky-500 bg-sky-100" : "border-slate-200 bg-slate-100"}`}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default function () {
  const {user, tenantsWithoutUser} = useLoaderData<LoaderData>();
  const [activeTab, setActiveTab] = useState<"posts"|"comments">("posts");

  return (
    <main className="container mx-auto">
      <Panel>
        <div className="flex">
          <div className="w-1/2">
            <MyH1>{user.name}</MyH1>
            <span>{user.email}</span>
          </div>
          <div className="w-1/2">
            <MyH3>Tenants</MyH3>
            <ul>
              {user.TenantUser.map(tenantUser => (
                <li key={tenantUser.id}>{tenantUser.Tenant.name}</li>
              ))}
            </ul>
            <Form method="post" style={{ display: 'inline' }}>
              <select name="tenantId">
                <option>Selecione</option>
                {tenantsWithoutUser.map(tenant => (
                  <option value={tenant.id}>{tenant.name}</option>
                ))}
              </select>
              <button type="submit" name="_action" value="add_tenant">Add to tenant</button>
            </Form>
          </div>
        </div>
      </Panel>
      <Panel>
        <header className="flex">
          <TabButton active={activeTab === "posts"} onClick={() => setActiveTab("posts")}>Posts</TabButton>
          <TabButton active={activeTab === "comments"} onClick={() => setActiveTab("comments")}>Comments</TabButton>
        </header>
        <div className={activeTab === "posts" ? "block" : "hidden"}>
          <MyH2>Posts</MyH2>
          <ul>
            {user.Post.map(post => (
              <li key={post.id}>{post.Feed.title} - {post.title}</li>
            ))}
          </ul>
        </div>
        <div className={activeTab === "comments" ? "block" : "hidden"}>
          <MyH2>Comments</MyH2>
          <ul>
            {user.Comment.map(comment => (
              <li key={comment.id}>{comment.Post.Feed.title} - {comment.Post.title} - {comment.description}</li>
            ))}
          </ul>
        </div>
      </Panel>
    </main>
  );
}
