import { baseURL } from '@/shared/api'
import { createJsonQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { identity } from 'ramda'
import { RATE_ENDPOINTS } from './endpoints'
import { RateResSchema } from './schema'
import { RateReq } from './types'

export const fetchRateFx = createJsonQuery({
  request: {
    method: 'GET',
    url: baseURL(RATE_ENDPOINTS.fetch()),
    headers: {
      'ngrok-skip-browser-warning': '69420'
    },
    credentials: 'include',
    query: identity
  },
  params: declareParams<RateReq>(),
  response: {
    contract: zodContract(RateResSchema)
  }
})
