import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { prisma } from "./prisma.server";

/**
 * @see https://github.com/sergiodxa/remix-auth
 */

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    /**
     * @see https://github.com/sergiodxa/remix-auth-form
     */
    const email = form.get("email")?.toString();
    if (!email) {
      throw 'No e-mail provided'
    }
    // const password = form.get("password");
    await prisma.$connect();
    const user = await prisma.user.findFirst({ where: { email }});
    await prisma.$disconnect();
    if (!user) {
      throw 'Unauthenticated'
    }
    /**
     * @todo: validate password
     */
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);