import { z } from 'zod'

export const CurrencyResSchema = z.object({
  currencies: z.array(z.string())
})
