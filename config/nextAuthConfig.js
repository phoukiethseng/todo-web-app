/* Contain options configuration for Next-Auth */

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prismaClient";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials, req) => {
        // Query pocketbase for user information
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: credentials.password,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        });
        console.log("authorize() user", user);
        return user ?? false;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log("session callback token", token);
      session.user.id = token.sub;
      return session;
    },
  },
};

export { authOptions };
