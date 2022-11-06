import type { ActionFunction, DataFunctionArgs } from "@remix-run/cloudflare";
import { LoaderArgs, redirect } from "@remix-run/cloudflare";
import { Form, useTransition } from "@remix-run/react";
import { RefObject, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  typedjson,
  TypedJsonResponse,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { Spinner } from "~/components/block/spinner";
import { MyLink } from "~/components/typography/link";
import { MyH1 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";
import { FeedLoaderData } from "./types";

export const loader = async ({
  request,
  context,
  params,
}: LoaderArgs): Promise<TypedJsonResponse<FeedLoaderData>> => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(
    typeof params.feedId === "string",
    `params.feedId should be a string`
  );

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
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(
    typeof params.feedId === "string",
    `params.feedId should be a string`
  );

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

  const [shouldFetchMore, setShouldFetchMore] = useState(feed.Post.length > 0);
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
    setShouldFetchMore(morePosts.data.feed.Post.length > 0);
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

  const endOfFeedInView = useInView();

  useEffect(() => {
    if (!endOfFeedInView.inView || !shouldFetchMore) {
      return;
    }
    morePosts.submit(
      { after: feed.Post[feed.Post.length - 1].id },
      { method: "get", action: `/feed/${feed.id}/load-posts` }
    );
  }, [endOfFeedInView.inView]);

  useEffect(() => {
    if (feed?.id !== initialFeed?.id) {
      setFeed(initialFeed);
    }
  }, [initialFeed]);

  return (
    <main className="container mx-auto">
      <MyH1>{feed.title}</MyH1>
      <Panel>
        <Form method="post" ref={formRef}>
          <fieldset className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Novo post</h2>
            <input
              name="title"
              placeholder="Título"
              required
              minLength={5}
              className="block w-full rounded-lg bg-gray-200 p-2"
            />
            <textarea
              name="description"
              placeholder="Descrição"
              required
              minLength={5}
              className="block w-full rounded-lg bg-gray-200 p-2"
            ></textarea>
            <button
              type="submit"
              name="_action"
              value="post"
              className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
            >
              Post it
            </button>
          </fieldset>
        </Form>
      </Panel>
      {feed.Post.map((post) => (
        <Panel key={post.id}>
          <div className="mb-5 flex flex-col gap-2">
            <div>
              <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>
              <span>{post.createdAt.toLocaleString()}</span>
            </div>
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.description}</p>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <Form
              method="post"
              className="flex flex-col gap-2"
              ref={(el) =>
                el && commentFormsRef.current
                  ? (commentFormsRef.current[post.id] = el)
                  : null
              }
            >
              <input type="hidden" name="postId" value={post.id} />
              <textarea
                placeholder="Comentário"
                className="block w-full rounded-lg bg-gray-200 p-2"
                name="description"
                required
                minLength={5}
              ></textarea>
              <button
                type="submit"
                className="ml-auto block rounded-md bg-sky-500 py-2 px-5 text-white"
                name="_action"
                value="comment"
              >
                Comentar
              </button>
            </Form>
            {post.Comment.map((comment) => (
              <div className="flex flex-col gap-2" key={comment.id}>
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
      <div
        ref={endOfFeedInView.ref}
        className="flex justify-center items-center py-10"
      >
        {shouldFetchMore ? (
          <Spinner />
        ) : (
          <p>Não há mais posts para carregar.</p>
        )}
      </div>
    </main>
  );
}
