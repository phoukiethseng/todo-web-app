/* Contain options configuration for Next-Auth */

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prismaClient";
import bcrypt from "bcrypt";

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
        let user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
          select: {
            password: true,
          },
        });
        if (!user) {
          // User not found
          return false;
        }
        if (await bcrypt.compare(credentials.password, user.password)) {
          console.log("bcrypt comapre success");
          user = await prisma.user.findFirst({
            where: {
              username: credentials.username,
            },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          });
          console.log("Authorized", user);
          return user;
        } else {
          return false;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      console.log("session callback token", token);
      const foundId = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });
      console.log(foundId);
      if (!foundId) {
        return null;
      }
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
};

export { authOptions };
