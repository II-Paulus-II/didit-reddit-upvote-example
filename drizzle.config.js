const drizzleConfig = {
  schema: "./src/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};

export default drizzleConfig;
