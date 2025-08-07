import { resetPassword } from "@/actions/reset-password-action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export default function ResetPasswordForm({token}: {token: string}) {

  const router = useRouter()

  const resetPasswordWithToken = resetPassword.bind(null, token)
  const [state, dispatch] = useFormState(resetPasswordWithToken, {
    errors: [],
    success: ""
  })

  useEffect(() => {
    if(state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if(state.success) {
      toast.success(state.success, {
        onClick: () => {
          router.push("/auth/login")
        },
        onClose: () => {
          router.push("/auth/login")
        }
      })
    }
  }, [state])
  return (
    <form 
      action={dispatch} 
      className="mt-14 space-y-5"
      noValidate
    >
      <div className="flex flex-col gap-5">
        <label htmlFor="" className="font-bold text-2xl">New Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          className="w-full border border-gray-300 p-3 rounded-lg" placeholder="Your new password"
        />
      </div>
      <div className="flex flex-col gap-5">
        <label htmlFor="" className="font-bold text-2xl">Repeat New Password</label>
        <input 
          type="password" 
          name="password_confirmation" 
          id="password_confirmation" 
          className="w-full border border-gray-300 p-3 rounded-lg" placeholder="Repeat password"
        />
      </div>
      <input type="submit" value="Save password" className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block" />
    </form>
  )
}
