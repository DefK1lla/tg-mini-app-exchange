import { z } from 'zod'

export const ClientSchema = z.object({
  id: z.string(),
  referredBy: z.string(),
  status: z.string(),
  referralToken: z.string(),
  createdAt: z.string().datetime()
})

export const FetchClientInfoResSchema = z.object({
  client: ClientSchema
})

export const FetchClientInfoReqSchema = z.object({
  id: z.string()
})
