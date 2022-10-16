import { json, redirect } from "@remix-run/cloudflare";
import type {
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import { Post } from "@prisma/client";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  await prisma.$connect();
  const feed = await prisma.feed.findUnique({
    where: { id: params.feedId },
    include: { Post: true },
  });
  await prisma.$disconnect();
  return json(feed);
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
  await prisma.$connect();
  await prisma.post.create({
    data: {
      title: body.get('title')?.toString() || 'Sem título',
      description: body.get('description')?.toString() || 'Sem descrição',
      feedId: params.feedId,
      userId: user.id,
    }
  });
  return redirect(`/feed/${params.feedId}`);
};

export default function () {
  const feed = useLoaderData();

  return (
    <div>
      <h1>{feed.title}</h1>
      <Form method="post">
        <input name="title" placeholder="Título" required minLength={5}/>
        <textarea name="description" placeholder="Descrição" required minLength={5}></textarea>
        <button type="submit" name="_action" value="post">Post</button>
      </Form>
      {feed.Post.map((post: Post) => <>
        <div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      </>)}
    </div>
  );
}
