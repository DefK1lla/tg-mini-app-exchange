import { z } from 'zod'

export const LimitsReqSchema = z.object({
  currency: z.string()
})

export const LimitsResSchema = z.object({
  min: z.string(),
  max: z.string()
})
