import { z } from "zod";

//Validation fields
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    name: z.string().min(1, { message: "Your name is required" }),
    password: z
      .string()
      .min(8, {
        message:
          "The password is too short, it must have at least eight characters",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "The password doesn't match",
    path: ["password_confirmation"],
  });

export const TokenSchema = z
  .string({ message: "Invalid token" })
  .length(6, { message: "Invalid token" })
  .max(6, { message: "Invalid token" });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message:
          "The password is too short , it must have at least eight characters",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password no match",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z.string().min(1, { message: "Budget's name is require" }),
  amount: z.coerce
    .number({ message: "Invalid amount" })
    .min(1, { message: "Invalid amount" }),
});

//Validation responses
export const SuccessSchema = z.string();
export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
