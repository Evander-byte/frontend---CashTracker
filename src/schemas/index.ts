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