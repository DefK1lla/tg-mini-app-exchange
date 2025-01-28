import { Store } from 'effector'
import { z } from 'zod'
import { LimitsReqSchema, LimitsResSchema } from './schema'

export type LimitsReq = z.infer<typeof LimitsReqSchema>
export type LimitsRes = z.infer<typeof LimitsResSchema>

export interface LimitsModelProps {
  $currency: Store<string | null>
}
