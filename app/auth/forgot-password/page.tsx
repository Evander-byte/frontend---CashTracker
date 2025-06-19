import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "CashTrackr - Recover your password",
  description: "CashTrackr - Recover your password",
}


export default function ForgotPasswordPage() {
  return (
  <>
      <h1 className="font-black text-6xl text-purple-950">Do you forgot your password?</h1>
      <p className="text-3xl font-bold">... Recover it and take control<span className="text-amber-500"> of your finances</span></p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/register"
          className="text-center text-gray-500"
        >
          Don't you have an account? Create an account
        </Link>
        <Link
          href="/auth/login"
          className="text-center text-gray-500"
        >
          Do you have an account? Sing in
        </Link>
      </nav>
  </>
  )
}
