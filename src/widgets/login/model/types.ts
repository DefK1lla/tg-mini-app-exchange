import { z } from 'zod'
import { LoginReqSchema } from './schema'

export type LoginReq = z.infer<typeof LoginReqSchema>
