import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      name: "credentials", // lowercase is important
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await $axios.post("api/auth/signin", {
            email: credentials.email,
            password: credentials.password,
          });

          console.log({ response });

          if (response.data) {
            // Return a user object that NextAuth can use
            return {
              id: response.data.id,
              email: credentials.email,
              name: response.data.name || credentials.email,
              // Include any other user data you need
            };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // TODO: Handle sign in by provider callback
      console.log({ user, account, profile });

      return true;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
});
