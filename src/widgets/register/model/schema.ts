import { PIN_LENGTH } from '@/shared/model/const'
import { z } from 'zod'

export const RegisterFormSchema = z.object({
  token: z.string(),
  pin: z.string().length(PIN_LENGTH),
  confirmPin: z.string().length(PIN_LENGTH)
})

export const RegisterReqSchema = z.object({
  userId: z.string(),
  referralToken: z.string(),
  pinCode: z.string().length(PIN_LENGTH)
})

export const RegisterResSchema = z.object({
  registrationId: z.string()
})

export const VerificationReqSchema = RegisterResSchema

export const VerifyReqSchema = z.object({
  registrationId: z.string(),
  code: z.string()
})
