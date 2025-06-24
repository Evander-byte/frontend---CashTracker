"use server"

import { RegisterSchema } from "@/src/schemas"

export async function register(formData: FormData) {
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  }

  //validate
  const register = RegisterSchema.safeParse(registerData)
  const errors = register.error?.errors.map(error => error.message) 

  if(!register.success){
    return {}
  }

  //register user
  const url = `${process.env.API_URL}/auth/create-account`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
    })
  })

  const json = await req.json()

  console.log(json)
}