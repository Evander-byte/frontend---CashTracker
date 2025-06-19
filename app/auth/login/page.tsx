import LoginForm from "@/components/auth/LoginForm"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "CashTrackr - Sign in",
  description: "CashTrackr - Sign in",
}


export default function LoginPage() {
  return (
  <>
      <h1 className="font-black text-6xl text-purple-950">Sign In</h1>
      <p className="text-3xl font-bold">and take control<span className="text-amber-500"> of your finances</span></p>

      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/register"
          className="text-center text-gray-500"
        >
          Don't you have an account? Create an account
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          Do you fortgot your password? Recover your password here!
        </Link>
      </nav>
  </>
  )
}
