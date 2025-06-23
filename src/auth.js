// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handler, signIn, signOut } = NextAuth({
  // adapter: MongoDBAdapter(client),
  providers: [GitHub],
});
