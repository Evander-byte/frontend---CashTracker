import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";

export default function ConfirmAccount() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Confirm your account</h1>
      <p className="text-3xl font-bold">Use the code you recive<span className="text-amber-500"> in your email</span></p>

      <ConfirmAccountForm />
    </>
  )
}
