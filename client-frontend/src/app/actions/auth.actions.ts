"use server";

import { validatedAction } from "@/middleware";
import { signInSchema } from "@/types/auth/auth.schemas";
import { AuthProviders } from "@/types/auth/auth.types";
import { signIn as ProviderSignin, signOut } from "@/auth";
import axios from "axios";

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_URL;

const $axios = axios.create({ baseURL: API_GATEWAY_URL });

export const signIn = validatedAction(
  signInSchema,
  async (data: { email: string; password: string }) => {
    const response = await $axios.post("/auth/signin", data);
    return response.data;
  }
);

export const signInWithProvider = async (provider: AuthProviders) => {
  if (!provider) return;
  await ProviderSignin(provider);
};

export const signOutAction = async () => {
  await signOut();
};
