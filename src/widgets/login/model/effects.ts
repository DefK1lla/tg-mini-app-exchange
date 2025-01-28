import { baseURL } from '@/shared/api'
import {
  createJsonQuery,
  declareParams,
  unknownContract
} from '@farfetched/core'
import { identity } from 'ramda'
import { LOGIN_ENDPOINTS } from './endpoints'
import { LoginReq } from './types'

export const loginFx = createJsonQuery({
  request: {
    method: 'POST',
    url: baseURL(LOGIN_ENDPOINTS.login()),
    body: identity
  },
  params: declareParams<LoginReq>(),
  response: {
    contract: unknownContract
  }
})
