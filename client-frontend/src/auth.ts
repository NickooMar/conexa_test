import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ user, account, profile }) {
      // TODO: Handle sign in by provider callback
      console.log({ user, account, profile });

      return true;
    },
  },
});
