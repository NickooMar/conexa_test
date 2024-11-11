"use server";

import { validatedAction } from "@/middleware";
import { signInSchema } from "@/types/auth/auth.schemas";
import { AuthProviders } from "@/types/auth/auth.types";
import { signIn as ProviderSignin } from "@/auth";

export const signIn = validatedAction(signInSchema, async (data) => {
  console.log({ data });
});

export const signInWithProvider = async (provider: AuthProviders) => {
  if (!provider) return;

  await ProviderSignin(provider);
};
