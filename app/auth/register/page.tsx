import RegisterForm from "@/components/auth/RegisterForm"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
  title: "CashTrackr - Create Account",
  description: "CashTrackr - Create Account",
}


export default function RegisterPage() {

  return (
  <>
      <h1 className="font-black text-6xl text-purple-950">Create an account</h1>
      <p className="text-3xl font-bold">and take control<span className="text-amber-500"> of your finances</span></p>

      <RegisterForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/login"
          className="text-center text-gray-500"
        >
          Do you have an account? Sing in
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
