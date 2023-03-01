/* Contain options configuration for Next-Auth */

import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/utils/authenticateUser";

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
        const user = await authenticateUser(
          credentials.username,
          credentials.password
        );
        if (user === null) {
          return false; // Credential is invalid, failed
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.sub;
      return session;
    },
  },
};

export { authOptions };
