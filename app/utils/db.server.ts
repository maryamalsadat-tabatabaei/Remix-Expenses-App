import { PrismaClient } from "@prisma/client";
// import { singleton } from "./singleton.server";
// // Hard-code a unique key, so we can look up the client when this module gets re-imported
// export const db = singleton("prisma", () => new PrismaClient());

let db: PrismaClient;

declare global {
  var db: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global.db) {
    global.db = new PrismaClient();
    global.db.$connect();
  }

  db = global.db;
}

export default db;
