import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import PostgresAdapter from "@auth/pg-adapter";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, orm } from "./db";

export const { auth, handlers, signOut, signIn } = NextAuth({
  // adapter: PostgresAdapter(db),
  adapter: DrizzleAdapter(orm),
  providers: [GitHub],
  // callbacks: {
  //   session: async ({ session, user }) => {
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
});
