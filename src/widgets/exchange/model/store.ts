import {
  createExchangeFx,
  CreateExchangeReqSchema,
  ExchangeForm,
  fetchExchangeFx
} from '@/entities/exchange'
import { createForm } from '@effector-reform/core'
import { zodAdapter } from '@effector-reform/zod'
import { createStore } from 'effector'

export const exchangeForm = createForm<ExchangeForm>({
  schema: {
    currencyFrom: null,
    currencyTo: null,
    amount: null,
    requisite: {
      crypto: {
        address: null,
        destinationTag: null
      }
    }
  },
  validation: zodAdapter(CreateExchangeReqSchema),
  validationStrategies: ['submit']
})

export const $exchangeId = createExchangeFx.$data.map((e) => e?.id)
export const $requisites = createExchangeFx.$data.map((e) => e?.requisite)
export const $exchange = fetchExchangeFx.$data.map((e) => e?.exchange)
export const $exchangeModalOpened = createStore(false)
