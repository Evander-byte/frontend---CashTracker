"use client"


import { register } from '@/actions/create-account-action'
import React from 'react'


export default function RegisterForm() {
  return (
    <form 
      className="mt-14 space-y-5"
      noValidate
      action={register}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold text-2xl">Email</label>
        <input 
          type="email" 
          className="w-full border border-gray-300 p-3 rounded-lg" id="email"
          placeholder="Registry email" 
          name="email" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-bold text-2xl">Name</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 p-3 rounded-lg" 
          name="name"
          placeholder="Username"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-bold text-2xl">Password</label>
        <input 
          type="password" 
          className="w-full border border-gray-300 p-3 rounded-lg"
          placeholder="Registry password"
          name="password" 
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password" className="font-bold text-2xl">Confirm password</label>
        <input 
          type="password" 
          className="w-full border border-gray-300 p-3 rounded-lg" 
          placeholder="Confirm your password"
          name="password_confirmation"
        />
      </div>
      <input 
        type="submit" 
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block" 
      />
    </form>
  )
}
