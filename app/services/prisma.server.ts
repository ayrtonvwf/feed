/**
 * @see https://github.com/marcomafessolli/remix-prisma-cloudflare-workers/blob/main/app/db.server.ts
 */

import { PrismaClient } from "@prisma/client/edge";

const DATABASE_URL =
  "prisma://aws-us-east-1.prisma-data.com/?api_key=***REMOVED***";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        // url: env.DATABASE_URL
        url: DATABASE_URL,
      },
    },
  });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      datasources: {
        db: {
          // url: env.DATABASE_URL,
          url: DATABASE_URL,
        },
      },
    });
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
