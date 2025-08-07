import PasswordResetHandler from '@/components/auth/PasswordResetHandler'
import React from 'react'

export default function NewPassword() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Restore your password</h1>
      <p className="text-3xl font-bold">Use the code you recive
        <span className="text-amber-500"> in your email</span>
      </p>
      <PasswordResetHandler />
    </>
  )
}
