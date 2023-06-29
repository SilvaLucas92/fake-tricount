import { compare } from "bcryptjs";
import NextAuth, { CookiesOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/Users";

export const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: "sessionToken",
    options: {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
};

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectMongoDB().catch((err) => {
          throw new Error(err);
        });

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = credentials?.password
          ? await compare(credentials?.password, user.password)
          : null;

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as any;
      session.user = user;

      return session;
    },
  },
  cookies,
};

export default NextAuth(options);
