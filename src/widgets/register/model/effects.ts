import { baseURL } from '@/shared/api'
import {
  createJsonQuery,
  declareParams,
  unknownContract
} from '@farfetched/core'
import { compose, dissoc, identity, prop } from 'ramda'

import { zodContract } from '@farfetched/zod'
import { REGISTER_ENDPOINTS } from './endpoints'
import { RegisterResSchema } from './schema'
import { RegisterReq, VerificationCodeReq, VerifyReq } from './types'

export const registerFx = createJsonQuery({
  request: {
    method: 'POST',
    body: identity,
    url: baseURL(REGISTER_ENDPOINTS.register())
  },
  params: declareParams<RegisterReq>(),
  response: {
    contract: zodContract(RegisterResSchema)
  }
})

export const createVerificationCodeFx = createJsonQuery({
  request: {
    method: 'POST',
    url: compose(
      baseURL,
      REGISTER_ENDPOINTS.createVerificationCode,
      prop('registrationId')
    )
  },
  params: declareParams<VerificationCodeReq>(),
  response: {
    contract: unknownContract
  }
})

export const verifyFx = createJsonQuery({
  request: {
    method: 'POST',
    body: dissoc('registrationId'),
    url: compose(baseURL, REGISTER_ENDPOINTS.verify, prop('registrationId'))
  },
  params: declareParams<VerifyReq>(),
  response: {
    contract: unknownContract
  }
})
