import { z } from 'zod'

export const RateReqSchema = z.object({
  currencyFrom: z.string(),
  currencyTo: z.string(),
  amount: z.string()
})

export const RateResSchema = z.object({
  rate: z.string(),
  rawRate: z.string()
})
