import { Tenant, TenantUser, User } from "@prisma/client";
import type { ActionFunction, DataFunctionArgs } from "@remix-run/cloudflare";
import {
  ErrorBoundaryComponent,
  LoaderArgs,
  redirect,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
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
import { MyH1, MyH2, MyH3 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { getSession } from "~/services/session.server";
import { ulid } from "~/services/uild.server";

type UserWithDetails = User & {
  TenantUser: (TenantUser & { Tenant: Tenant })[];
  Post: StandalonePostType[];
  Comment: StandaloneCommentType[];
};

type LoaderData = {
  currentUser: User;
  user: UserWithDetails;
  tenantsWithoutUser: Tenant[];
};

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const currentUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));
  const tenantId = session.get("tenantId")?.toString() || "";

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();
  const [user, tenantsWithoutUser] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.userId },
      include: {
        TenantUser: { include: { Tenant: true } },
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
    }),
  ]);

  await prisma.$disconnect();
  if (!user) {
    throw new Error(`User não encontrado.`);
  }

  return typedjson({ user, tenantsWithoutUser, currentUser });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.type !== "SUPERADMIN") {
    return redirect("/");
  }

  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  invariant(params.userId, `params.userId is required`);

  await prisma.$connect();

  if (_action === "add_tenant") {
    await prisma.tenantUser.create({
      data: {
        id: ulid(),
        tenantId: values.tenantId?.toString() || "undefined-tenant",
        userId: params.userId,
      },
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
  const { user, tenantsWithoutUser, currentUser } =
    useTypedLoaderData<LoaderData>();
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");

  return (
    <main className="container mx-auto">
      <Panel>
        <div className="flex">
          <div className="w-full">
            <MyH1>{user.name}</MyH1>
            <span>{user.email}</span>
          </div>
          {(user.id === currentUser.id ||
            currentUser.type === "SUPERADMIN") && (
            <div className="w-full">
              <MyH3>Tenants</MyH3>
              <ul>
                {user.TenantUser.map((tenantUser) => (
                  <li key={tenantUser.id}>{tenantUser.Tenant.name}</li>
                ))}
              </ul>
              {currentUser.type === "SUPERADMIN" && (
                <Form method="post" style={{ display: "inline" }}>
                  <select name="tenantId">
                    <option>Selecione</option>
                    {tenantsWithoutUser.map((tenant) => (
                      <option value={tenant.id}>{tenant.name}</option>
                    ))}
                  </select>
                  <button type="submit" name="_action" value="add_tenant">
                    Add to tenant
                  </button>
                </Form>
              )}
            </div>
          )}
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
