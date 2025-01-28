import { z } from 'zod'
import {
  RegisterReqSchema,
  VerificationReqSchema,
  VerifyReqSchema
} from './schema'

export enum RegisterSteps {
  TOKEN = 0,
  PIN = 1,
  CONFIRM_PIN = 2,
  VERIFICATION = 3,
  ALREADY_REGISTERED = 4,
  SUCCESS = 5
}

export type RegisterReq = z.infer<typeof RegisterReqSchema>
export type VerificationCodeReq = z.infer<typeof VerificationReqSchema>
export type VerifyReq = z.infer<typeof VerifyReqSchema>
