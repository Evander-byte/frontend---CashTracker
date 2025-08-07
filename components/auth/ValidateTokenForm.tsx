"use client"

import { validateToken } from '@/actions/validate-token-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useRouter } from 'next/router'
import React, { Dispatch, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

type ValidateTokenFormProps = {
  token: string
  setToken: Dispatch<React.SetStateAction<string>>
  setIsValidToken: Dispatch<React.SetStateAction<boolean>>
}

export default function ValidateTokenForm({token, setToken, setIsValidToken}: ValidateTokenFormProps) {
  const [isComplete, setIsComplete] = useState(false)

  const validateTokenInput = validateToken.bind(null, token)
  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: ""
  })

  useEffect(() => {
    if(isComplete) {
      dispatch()
    }
  }, [isComplete])

  useEffect(() => {
    if(state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if(state.success) {
      toast.success(state.success)
      setIsValidToken(true)
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const onComplete = () => {
    setIsComplete(true)
  }
  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={onComplete}
        >
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        </PinInput>
      </div>
    </>
  )
}
