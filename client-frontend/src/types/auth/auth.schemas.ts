import z from "zod";
import { AuthProviders } from "./auth.types";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(4, { message: "Email should be at least 4 characters" }),
  password: z.string().min(2, { message: "Password is required" }).max(50),
});

export const signInProviderSchema = z.object({
  provider: z.enum(Object.values(AuthProviders) as [string, ...string[]], {
    message: "Provider is invalid",
  }),
});
