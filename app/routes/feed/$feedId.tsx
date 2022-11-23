import { LoaderArgs } from "@remix-run/cloudflare";
import { FetcherWithComponents } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  typedjson,
  TypedJsonResponse,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { ValidatedForm } from "remix-validated-form";
import invariant from "tiny-invariant";
import { Panel } from "~/components/block/panel";
import { Spinner } from "~/components/block/spinner";
import { FeedPost } from "~/components/feed/feed-post";
import { MyInput } from "~/components/form/input";
import { MySubmitButton } from "~/components/form/submit-button";
import { MyTextarea } from "~/components/form/textarea";
import { MyH1, MyH2 } from "~/components/typography/title";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { CreatePostAction, postValidator } from "./$feedId/create-post";
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
          Feed: true,
          Comment: { take: 3, include: { User: true }, orderBy: { id: "asc" } },
          _count: { select: { Comment: true } },
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

  const postSubmitter = useTypedFetcher<CreatePostAction>();
  useEffect(() => {
    if (!postSubmitter?.data) {
      return;
    }
    setFeed({
      ...feed,
      Post: [postSubmitter.data.createdPost, ...feed.Post],
    });
    setShouldFetchMore(true);
  }, [postSubmitter.data]);

  return (
    <main className="container mx-auto max-w-4xl">
      <MyH1>{feed.title}</MyH1>
      <Panel>
        <ValidatedForm
          resetAfterSubmit
          validator={postValidator}
          method="post"
          action={`/feed/${feed.id}/create-post`}
          fetcher={postSubmitter as FetcherWithComponents<never>}
        >
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
