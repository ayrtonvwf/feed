import { User } from "@prisma/client";
import { SessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { verify } from "./hash.server";
import { prisma } from "./prisma.server";

export const getAuth = (sessionStorage: SessionStorage) => {
  /**
   * @see https://github.com/sergiodxa/remix-auth
   */

  // Create an instance of the authenticator, pass a generic with what
  // strategies will return and will store in the session
  const authenticator = new Authenticator<User>(sessionStorage);

  authenticator.use(
    new FormStrategy(async ({ form }) => {
      /**
       * @see https://github.com/sergiodxa/remix-auth-form
       */
      const email = form.get("email")?.toString();
      if (!email) {
        throw "No e-mail provided";
      }
      const password = form.get("password")?.toString();
      if (!password) {
        throw "No password provided";
      }

      await prisma.$connect();
      const user = await prisma.user.findFirst({ where: { email } });
      await prisma.$disconnect();
      if (!user) {
        throw "User not found";
      }
      if (!user.passwordHash) {
        throw "No password defined";
      }
      const verified = await verify({ password, hash: user.passwordHash });
      if (!verified) {
        throw "Invalid password";
      }
      return user;
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
  );

  return authenticator;
};
