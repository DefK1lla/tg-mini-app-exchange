import { z } from 'zod'

export const LoginFormSchema = z.object({
  pin: z.string().length(4)
})

export const LoginReqSchema = z.object({
  id: z.string(),
  pin: z.string().length(4)
})
