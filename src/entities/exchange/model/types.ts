import { AnySchema } from '@effector-reform/core'
import { z } from 'zod'
import {
  CreateExchangeReqSchema,
  ExchangeSchema,
  FetchExchangeResSchema,
  FetchExchangeSchema
} from './schema'

export type CreateExchangeReq = z.infer<typeof CreateExchangeReqSchema>
export type FetchExchangeReq = z.infer<typeof FetchExchangeSchema>
export type FetchExchangeRes = z.infer<typeof FetchExchangeResSchema>
export type Exchange = z.infer<typeof ExchangeSchema>

export interface ExchangeForm extends AnySchema {
  currencyFrom: string | null
  currencyTo: string | null
  amount: string | null
  requisite: {
    crypto: {
      address: string | null
      destinationTag: string | null
    }
  }
}
