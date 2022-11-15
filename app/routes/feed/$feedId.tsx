import type { ActionFunction, DataFunctionArgs } from "@remix-run/cloudflare";
import { LoaderArgs, redirect } from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  typedjson,
  TypedJsonResponse,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";
import { Panel } from "~/components/block/panel";
import { Spinner } from "~/components/block/spinner";
import { FeedPost } from "~/components/feed/feed-post";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyTextarea } from "~/components/form/textarea";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";
import { FeedLoaderData } from "./types";

export const postValidator = withZod(
  z.object({
    title: z.string().min(5, { message: "Title is required" }),
    description: z.string().min(5, { message: "Description is required" }),
  })
);

export const commentValidator = withZod(
  z.object({
    postId: z.string().min(1, { message: "postId is required" }),
    description: z.string().min(5, { message: "Description is required" }),
  })
);

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

  const body = await request.clone().formData();
  const { _action } = Object.fromEntries(body);

  invariant(
    typeof _action === "string" && ["post", "comment"].includes(_action),
    `body._action should be either 'post' or 'comment'`
  );

  if (_action === "post") {
    const validated = await postValidator.validate(
      await request.clone().formData()
    );

    if (validated.error) {
      // validationError comes from `remix-validated-form`
      return validationError(validated.error, validated.data);
    }

    await prisma.$connect();
    await prisma.post.create({
      data: {
        id: ulid(),
        title: validated.data.title,
        description: validated.data.description,
        feedId: params.feedId,
        userId: user.id,
      },
    });
  }

  if (_action === "comment") {
    const validated = await commentValidator.validate(
      await request.clone().formData()
    );

    if (validated.error) {
      // validationError comes from `remix-validated-form`
      return validationError(validated.error, validated.data);
    }

    await prisma.$connect();
    await prisma.comment.create({
      data: {
        id: ulid(),
        description: validated.data.description,
        postId: validated.data.postId,
        userId: user.id,
      },
    });
  }

  await prisma.$disconnect();
  return redirect(`/feed/${params.feedId}`);
};

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
        <ValidatedForm resetAfterSubmit validator={postValidator} method="post">
          <fieldset className="flex flex-col gap-2">
            <MyH2>Novo post</MyH2>
            <MyInput name="title" label="Título" />
            <MyTextarea name="description" label="Descrição" />
            <MySubmitButton name="_action" value="post" />
          </fieldset>
        </ValidatedForm>
      </Panel>
      {feed.Post.map((post) => (
        <FeedPost post={post} key={post.id} />
        // <Panel key={post.id}>
        //   <div className="mb-5 flex flex-col gap-2">
        //     <div>
        //       <MyLink to={`/user/${post.User.id}`}>{post.User.name}</MyLink>
        //       <span>{post.createdAt.toLocaleString()}</span>
        //     </div>
        //     <h3 className="font-bold">{post.title}</h3>
        //     <p>{post.description}</p>
        //   </div>
        //   <hr />
        //   <div className="flex flex-col gap-2">
        //     <ValidatedForm
        //       validator={commentValidator}
        //       className="flex flex-col gap-2"
        //       method="post"
        //       resetAfterSubmit
        //     >
        //       <input type="hidden" name="postId" value={post.id} />
        //       <MyTextarea name="description" label="Comentário" />
        //       <MySubmitButton name="_action" value="comment" />
        //     </ValidatedForm>
        //     {post.Comment.map((comment) => (
        //       <div className="flex flex-col gap-2" key={comment.id}>
        //         <div>
        //           <MyLink to={`/user/${comment.User.id}`}>
        //             {comment.User.name}
        //           </MyLink>
        //           <span>{comment.createdAt.toLocaleString()}</span>
        //         </div>
        //         <p>{comment.description}</p>
        //       </div>
        //     ))}
        //   </div>
        // </Panel>
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
