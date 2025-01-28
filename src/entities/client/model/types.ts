import { z } from 'zod'
import {
  ClientSchema,
  FetchClientInfoReqSchema,
  FetchClientInfoResSchema
} from './schema'

export type Client = z.infer<typeof ClientSchema>
export type FetchClientInfoReq = z.infer<typeof FetchClientInfoReqSchema>
export type FetchClientInfoRes = z.infer<typeof FetchClientInfoResSchema>
