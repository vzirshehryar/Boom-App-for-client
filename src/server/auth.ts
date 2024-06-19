import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "@/env";
import { db } from "@/server/db";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { decrypt } from "@/libs/utils";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // check to see if email and password is there
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // check to see if user exists
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            WordpressWebsite: true,
          },
        });

        // if no user was found
        if (!user) {
          throw new Error("Email or password is incorrect");
        }
        // if user is not verified
        if (user.emailVerified === null) {
          throw new Error("Email is not verified, please verify your email");
        }

        if (!user.password) {
          throw new Error(
            "Email is linked to third-party account, setup a password from aacount setting to login with email and password",
          );
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Email or password is incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          openaiApiKey: decrypt(user.openaiApiKey),
          stripeCustomerId: user.stripeCustomerId,
          trialClaimed: user.trialClaimed,
          wordpressWebsites: user.WordpressWebsite,
        };
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          WordpressWebsite: true,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        wordpressWebsites: dbUser.WordpressWebsite,
        openaiApiKey: decrypt(dbUser.openaiApiKey),
        stripeCustomerId: dbUser.stripeCustomerId,
        trialClaimed: dbUser.trialClaimed,
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
