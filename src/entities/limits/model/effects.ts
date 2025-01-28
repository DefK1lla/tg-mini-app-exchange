import { baseURL } from '@/shared/api'
import { createJsonQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { identity } from 'ramda'
import { LIMITS_ENDPOINTS } from './endpoints'
import { LimitsResSchema } from './schema'
import { LimitsReq } from './types'

export const fetchLimtisFx = createJsonQuery({
  request: {
    method: 'GET',
    url: baseURL(LIMITS_ENDPOINTS.fetch()),
    headers: {
      'ngrok-skip-browser-warning': '69420'
    },
    query: identity,
    credentials: 'include'
  },
  params: declareParams<LimitsReq>(),
  response: {
    contract: zodContract(LimitsResSchema)
  }
})
