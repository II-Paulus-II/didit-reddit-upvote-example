import {
  pgTable,
  foreignKey,
  pgEnum,
  serial,
  text,
  integer,
  timestamp,
  varchar,
  bigint,
  unique,
  smallint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey().notNull(),
    body: text("body").notNull(),
    userId: integer("user_id").references(() => users.id),
    postId: integer("post_id").references(() => posts.id),
    parentCommentId: integer("parent_comment_id"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => {
    return {
      commentsParentCommentIdFkey: foreignKey({
        columns: [table.parentCommentId],
        foreignColumns: [table.id],
        name: "comments_parent_comment_id_fkey",
      }),
    };
  }
);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId").notNull(),
  expires: timestamp("expires", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  expiresAt: bigint("expires_at", { mode: "number" }),
  idToken: text("id_token"),
  scope: text("scope"),
  sessionState: text("session_state"),
  tokenType: text("token_type"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  emailVerified: timestamp("emailVerified", {
    withTimezone: true,
    mode: "string",
  }),
  image: text("image"),
});

export const votes = pgTable(
  "votes",
  {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => users.id),
    postId: integer("post_id").references(() => posts.id),
    commentId: integer("comment_id").references(() => comments.id),
    vote: smallint("vote"),
    voteType: varchar("vote_type", { length: 255 }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).defaultNow(),
  },
  (table) => {
    return {
      votesUserIdPostIdCommentIdVoteTypeKey: unique(
        "votes_user_id_post_id_comment_id_vote_type_key"
      ).on(table.userId, table.postId, table.commentId, table.voteType),
    };
  }
);

export const verificationToken = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    expires: timestamp("expires", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    token: text("token").notNull(),
  },
  (table) => {
    return {
      verificationTokenPkey: primaryKey({
        columns: [table.identifier, table.token],
        name: "verification_token_pkey",
      }),
    };
  }
);
