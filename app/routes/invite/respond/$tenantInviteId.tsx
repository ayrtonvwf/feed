import { DataFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "remix-typedjson";
import invariant from "tiny-invariant";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";
import { ulid } from "~/services/uild.server";

export const action = async ({
  request,
  context,
  params,
}: DataFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);
  const response = url.searchParams.get("response")?.toString() || "";

  invariant(
    typeof params.tenantInviteId === "string",
    "params.tenantInviteId should be a string"
  );
  invariant(
    ["accept", "decline"].includes(response),
    "searchParams.response should be either accept or decline"
  );

  await prisma.$connect();

  const existingInvite = await prisma.tenantInvite.findFirst({
    where: { email: user.email, id: params.tenantInviteId },
    include: { Tenant: true },
  });

  if (!existingInvite || existingInvite.respondedAt) {
    await prisma.$disconnect();
    return redirect("/");
  }

  const existingTenantUser = await prisma.tenantUser.findFirst({
    where: { User: { email: user.email }, tenantId: existingInvite.Tenant.id },
  });

  if (existingTenantUser && response === "accept") {
    await prisma.$disconnect();
    throw new Error("User already on tenant");
  }

  if (response === "accept") {
    await prisma.tenantUser.create({
      data: {
        id: ulid(),
        userId: user.id,
        tenantId: existingInvite.Tenant.id,
        type: "NORMAL",
      },
    });
  }

  await prisma.tenantInvite.update({
    data: {
      respondedAt: new Date(),
      response: response === "accept",
    },
    where: { id: existingInvite.id },
  });

  await prisma.$disconnect();

  return redirect("/invite");
};
