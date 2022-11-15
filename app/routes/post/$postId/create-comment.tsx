import { DataFunctionArgs } from "@remix-run/cloudflare";
import { withZod } from "@remix-validated-form/with-zod";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { z } from "zod";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const commentValidator = withZod(
  z.object({
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
    typeof params.postId === "string",
    `params.postId should be a string`
  );

  const validated = await commentValidator.validate(
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

  const body = await request.formData();
  const data = Object.fromEntries(body);

  invariant(
    typeof data.description === "string",
    `data.description is required`
  );

  await prisma.$connect();
  const createdComment = await prisma.comment.create({
    data: {
      id: ulid(),
      description: data.description,
      postId: params.postId,
      userId: user.id,
    },
    include: {
      User: true,
    },
  });

  await prisma.$disconnect();
  return typedjson({ createdComment }, { status: 201 });
};

export type CreateCommentAction = typeof action;
