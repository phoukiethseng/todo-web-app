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
        let user;
        try {
          user = await prisma.user.findFirst({
            where: {
              username: credentials.username,
            },
            select: {
              password: true,
            },
          });
        } catch (err) {
          console.log(
            "Error occurred in authorize callback, prisma query thrown an error ",
            err
          );
          return false;
        }
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
      try {
        console.log("session callback, token", token);
        const foundId = await prisma.user.findFirst({
          where: {
            id: token.sub,
          },
        });
        console.log("session callback, found user in database", foundId);
        if (!foundId) {
          return null;
        }
        session.user.id = token.sub;
        return session;
      } catch (err) {
        console.log("Error occurred in session callback: ", err);
        return null;
      }
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
};

export { authOptions };
