import { z } from 'zod'
import { CurrencyResSchema } from './schema'

export type CurrencyRes = z.infer<typeof CurrencyResSchema>
