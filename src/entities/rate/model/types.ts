import { Store } from 'effector'
import { z } from 'zod'
import { RateReqSchema, RateResSchema } from './schema'

export type RateReq = z.infer<typeof RateReqSchema>
export type RateRes = z.infer<typeof RateResSchema>

export interface RateModelProps {
  $currencyFrom: Store<string | null>
  $currencyTo: Store<string | null>
  $amount: Store<string | null>
  $limits: Store<{
    min: string
    max: string
  } | null>
}
