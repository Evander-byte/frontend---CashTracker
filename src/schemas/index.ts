import { z } from "zod"
import { email } from "zod/v4"

export const RegisterSchema = z.object({
  email: z.string()
          .min(1, {message: "Email is required"})
          .email({message: "Invalid email"}),
  name: z.string()
          .min(1, {message: "Your name is required"}),
  password: z.string()
              .min(8, {message: "The password is too short, it must have at least eight characters"}),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "The password doesn't match",
  path: ["password_confirmation"]
})

export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.object({
  error: z.string()
})

export const TokenSchema = z.string({message: "Invalid token"})
                            .length(6, {message: "Invalid token"})
                            .max(6, {message: "Invalid token"})