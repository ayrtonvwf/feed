import { LoaderArgs, redirect } from "@remix-run/cloudflare";
import type { DataFunctionArgs, ActionFunction } from "@remix-run/cloudflare";
import { Form, Link, useTransition } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";
import { MyH1 } from "~/components/typography/title";
import { Panel } from "~/components/block/panel";
import { RefObject, useEffect, useRef, useState } from "react";
import { ulid } from "~/services/uild.server";
import { FeedLoaderData } from "./types";
import {
  typedjson,
  TypedJsonResponse,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { MyLink } from "~/components/typography/link";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<FeedLoaderData>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  await prisma.$connect();
  const feed = await prisma.feed.findUnique({
    where: { id: params.feedId },
    include: {
      Post: {
        take: 2,
        include: {
          User: true,
          Comment: { include: { User: true }, orderBy: { id: "asc" } },
        },
        orderBy: { id: "desc" },
      },
    },
  });
  await prisma.$disconnect();

  if (!feed) {
    throw new Error("Feed not found");
  }

  return typedjson({ feed });
};

export const action: ActionFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  invariant(params.feedId, `params.feedId is required`);

  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Error("Not authenticated");
  }

  const body = await request.formData();
  const { _action, ...values } = Object.fromEntries(body);

  await prisma.$connect();

  if (_action === "post") {
    await prisma.post.create({
      data: {
        id: ulid(),
        title: values.title?.toString() || "Sem título",
        description: values.description?.toString() || "Sem descrição",
        feedId: params.feedId,
        userId: user.id,
      },
    });
  }

  if (_action === "comment") {
    await prisma.comment.create({
      data: {
        id: ulid(),
        description: values.description?.toString() || "Sem descrição",
        postId: values.postId?.toString() || "invalid-post-id",
        userId: user.id,
      },
    });
  }

  await prisma.$disconnect();
  return redirect(`/feed/${params.feedId}`);
};

/**
 * @todo implement infinite scroll
 * @see https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
 */
export default function () {
  const { feed: initialFeed } = useTypedLoaderData<FeedLoaderData>();
  const [feed, setFeed] = useState(initialFeed);

  const morePosts = useTypedFetcher<FeedLoaderData>();

  useEffect(() => {
    /**
     * @see https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
     */
    if (!morePosts.data) {
      return;
    }

    setFeed({
      ...feed,
      Post: [...feed.Post, ...morePosts.data.feed.Post],
    });
  }, [morePosts.data]);

  const transition = useTransition();

  const isPosting =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "post";
  const formRef = useRef() as RefObject<HTMLFormElement>;
  useEffect(() => {
    if (!isPosting) {
      formRef.current?.reset();
    }
  }, [isPosting]);

  const isCommentingOnPostId =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "comment"
      ? transition.submission.formData.get("postId")?.toString()
      : null;
  const commentFormsRef = useRef({}) as RefObject<
    Record<string, HTMLFormElement>
  >;
  /**
   * @see https://aparnajoshi.netlify.app/reactjs-multiple-refs-for-handling-form-elements#useref-for-handling-a-multiple-input-element
   */
  useEffect(() => {
    if (isCommentingOnPostId) {
      commentFormsRef.current?.[isCommentingOnPostId].reset();
    }
  }, [isCommentingOnPostId]);

  return (
    <main className="container mx-auto">
      <MyH1>{feed.title}</MyH1>
      <Panel>
        <Form method="post" ref={formRef}>
          <fieldset className="gap-2 flex flex-col">
            <h2 className="text-lg font-semibold">Novo post</h2>
            <input
              name="title"
              placeholder="Título"
              required
              minLength={5}
              className="block rounded-lg w-full bg-gray-200 p-2"
            />
            <textarea
              name="description"
              placeholder="Descrição"
              required
              minLength={5}
              className="block rounded-lg w-full bg-gray-200 p-2"
            ></textarea>
            <button
              type="submit"
              name="_action"
              value="post"
              className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md"
            >
              Post it
            </button>
          </fieldset>
        </Form>
      </Panel>
      {feed.Post.map((post) => (
        <Panel key={post.id}>
          <div className="gap-2 flex flex-col mb-5">
            <div>
              <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>
              <span>{post.createdAt.toLocaleString()}</span>
            </div>
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.description}</p>
          </div>
          <hr />
          <div className="gap-2 flex flex-col">
            <Form
              method="post"
              className="gap-2 flex flex-col"
              ref={(el) =>
                el && commentFormsRef.current
                  ? (commentFormsRef.current[post.id] = el)
                  : null
              }
            >
              <input type="hidden" name="postId" value={post.id} />
              <textarea
                placeholder="Comentário"
                className="block rounded-lg w-full bg-gray-200 p-2"
                name="description"
                required
                minLength={5}
              ></textarea>
              <button
                type="submit"
                className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md"
                name="_action"
                value="comment"
              >
                Comentar
              </button>
            </Form>
            {post.Comment.map((comment) => (
              <div className="gap-2 flex flex-col" key={comment.id}>
                <div>
                  <MyLink to={`/user/${comment.User.id}`}>
                    {comment.User.name}
                  </MyLink>
                  <span>{comment.createdAt.toLocaleString()}</span>
                </div>
                <p>{comment.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      ))}
      <morePosts.Form method="get" action="/feed/load-more">
        <input type="hidden" name="feedId" value={feed.id} />
        <input
          type="hidden"
          name="after"
          value={feed.Post[feed.Post.length - 1].id}
        />
        <button
          type="submit"
          className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md"
        >
          {morePosts.state === "submitting" ? "Carregando..." : "Mais posts"}
        </button>
      </morePosts.Form>
    </main>
  );
}
