import { validatedAction } from "@/middleware";
import { signInSchema } from "@/types/auth/auth.schemas";
import { AuthProviders } from "@/types/auth/auth.types";

export const signIn = validatedAction(signInSchema, async (data) => {
  console.log({ data });
});

export const signInWithProvider = async (provider: AuthProviders) => {
  console.log({ provider });
};
