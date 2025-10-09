"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ActionsStateType = {
  errors: string[],
  success: string
}

export async function validateToken(token: string, prevState: ActionsStateType)
{

  const confirmToken = TokenSchema.safeParse(token)
  if(!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map(issue => issue.message),
      success: ""
    }
  }

  //Confirm token
  const url = `${process.env.API_URL}/auth/validate-token`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: confirmToken.data
    })
  })

  const json = await req.json()
  if(!req.ok) {
    const { message } = ErrorResponseSchema.parse(json)
    return {
      errors: [message],
      success: ""
    }
  }

  const success = SuccessSchema.parse(json)
  return {
    errors: [],
    success
  }
}