"use server";

import { ActionState, validatedAction } from "@/middleware";
import { signInSchema } from "@/types/auth/auth.schemas";
import { AuthProviders } from "@/types/auth/auth.types";
import { signIn as ProviderSignin, signOut } from "@/auth";
import { signIn as nextAuthSignIn } from "@/auth";

export const signIn = validatedAction(
  signInSchema,
  async (data: { email: string; password: string }): Promise<ActionState> => {
    try {
      const result = await nextAuthSignIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log({ result });

      return { success: "" };

      // if (!result) {
      //   return { error: "Authentication failed" };
      // }

      // if (result.error) {
      //   return { error: result.error };
      // }

      // return { success: "" };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
);
export const signInWithProvider = async (provider: AuthProviders) => {
  if (!provider) return;
  await ProviderSignin(provider);
};

export const signOutAction = async () => {
  await signOut();
};
