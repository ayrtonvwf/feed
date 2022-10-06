import { Feed } from "@prisma/client";
import { DataFunctionArgs, json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/prisma/index.server";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  await prisma.$connect();
  const feeds = await prisma.feed.findMany();
  await prisma.$disconnect();
  return json(feeds);
};

export default function Index() {
  const feeds = useLoaderData<Feed[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Feeds</h1>
      {feeds.map(feed => <>
        <Link to={`/feed/${feed.id}`}>{feed.title}</Link>
      </>)}
      <iframe src="https://giphy.com/gifs/season-12-the-simpsons-12x6-3orif6SZHGRvNulw0E/fullscreen" width="100%" height="600px" style={{ overflow: 'hidden' }}/>
    </div>
  );
}
