import { DataFunctionArgs } from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { z } from "zod";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const postValidator = withZod(
  z.object({
    title: z.string().min(5, { message: "Title is required" }),
    description: z.string().min(5, { message: "Description is required" }),
  })
);

export const action = async ({
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

  const validated = await postValidator.validate(
    await request.clone().formData()
  );

  if (validated.error) {
    /**
     * @todo return validation error when typing gets solved
     * @see https://github.com/airjp73/remix-validated-form/issues/205
     */
    // validationError comes from `remix-validated-form`
    // return validationError(validated.error, validated.data);
    throw new Error("Validation error");
  }

  await prisma.$connect();
  const createdPost = await prisma.post.create({
    data: {
      id: ulid(),
      title: validated.data.title,
      description: validated.data.description,
      feedId: params.feedId,
      userId: user.id,
    },
    include: {
      User: true,
      Feed: true,
      Comment: { take: 3, include: { User: true }, orderBy: { id: "asc" } },
      _count: { select: { Comment: true } },
    },
  });

  await prisma.$disconnect();
  return typedjson({ createdPost }, { status: 201 });
};

export type CreatePostAction = typeof action;
