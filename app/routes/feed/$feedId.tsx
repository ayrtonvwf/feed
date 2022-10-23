import { json, redirect } from "@remix-run/cloudflare";
import type {
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/services/prisma.server";
import { Comment, Post, User } from "@prisma/client";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";
import { MyReactions } from "~/components/feed/reactions";

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  await prisma.$connect();
  const feed = await prisma.feed.findUnique({
    where: { id: params.feedId },
    include: {
      Post: {
        include: { User: true, Comment: { include: { User: true } } },
      }
    },
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
  const { _action, ...values } = Object.fromEntries(body);

  await prisma.$connect();

  if (_action === 'post') {
    await prisma.post.create({
      data: {
        title: values.title?.toString() || 'Sem título',
        description: values.description?.toString() || 'Sem descrição',
        feedId: params.feedId,
        userId: user.id,
      }
    });
  }

  if (_action === 'comment') {
    await prisma.comment.create({
      data: {
        description: values.description?.toString() || 'Sem descrição',
        postId: values.postId?.toString() || 'invalid-post-id',
        userId: user.id,
      }
    });
  }

  await prisma.$disconnect();
  return redirect(`/feed/${params.feedId}`);
};

export default function () {
  const feed = useLoaderData();

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold">{feed.title}</h1>
      <Form method="post" className="bg-white my-5 p-5 shadow">
        <fieldset className="gap-2 flex flex-col">
          <h2 className="text-lg font-semibold">Novo post</h2>
          <input name="title" placeholder="Título" required minLength={5} className="block rounded-lg w-full bg-gray-200 p-2" />
          <textarea name="description" placeholder="Descrição" required minLength={5} className="block rounded-lg w-full bg-gray-200 p-2"></textarea>
          <button type="submit" name="_action" value="post" className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md">Post it</button>
        </fieldset>
      </Form>
      {feed.Post.map((post: Post & { User: User, Comment: (Comment & { User: User })[] }) => <>
        <div className="bg-white my-5 p-5 shadow gap-2 flex flex-col" key={post.id}>
          <div className="gap-2 flex flex-col mb-5">
            <div>
              <span className="text-sky-600">{post.User.name}</span>
              <span>{post.createdAt.toLocaleString()}</span>
            </div>
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.description}</p>
          </div>
          <hr />
          <MyReactions />
          <div className="gap-2 flex flex-col">
            <Form method="post" className="gap-2 flex flex-col">
              <input type="hidden" name="postId" value={post.id} />
              <textarea placeholder="Comentário" className="block rounded-lg w-full bg-gray-200 p-2" name="description" required minLength={5}></textarea>
              <button type="submit" className="block ml-auto bg-sky-500 text-white py-2 px-5 rounded-md" name="_action" value="comment">Comentar</button>
            </Form>
            {post.Comment.map((comment) => (
              <div className="gap-2 flex flex-col" key={comment.id}>
                <div>
                  <span className="text-sky-600">{comment.User.name}</span>
                  <span>{comment.createdAt.toLocaleString()}</span>
                </div>
                <p>{comment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </>)}
    </div>
  );
}
