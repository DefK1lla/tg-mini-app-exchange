import { createLimitsModel } from '@/entities/limits'
import { createRateModel } from '@/entities/rate'
import { $t } from '@/features/i18n'
import { invoke } from '@withease/factories'
import { sample } from 'effector'
import { createGate } from 'effector-react'
import { interval } from 'patronum'
import { complement, equals, isNotNil, pathEq, T } from 'ramda'

import { AMOUNT_ERROR } from './const'

import { createExchangeFx, fetchExchangeFx } from '@/entities/exchange'
import { Statuses } from '@/shared/model/types'
import { startPollingEv, stopPollingEv, toggleModalEv } from './events'
import { $exchangeId, $exchangeModalOpened, exchangeForm } from './store'

export const $$limitsModel = invoke(createLimitsModel, {
  $currency: exchangeForm.$values.map((v) => v.currencyFrom)
})

export const $$rateModel = invoke(createRateModel, {
  $currencyFrom: exchangeForm.$values.map((v) => v.currencyFrom),
  $currencyTo: exchangeForm.$values.map((v) => v.currencyTo),
  $amount: exchangeForm.$values.map((v) => v.amount),
  $limits: $$limitsModel.outputs.$limits
})

export const ExchangeGate = createGate()

sample({
  clock: exchangeForm.validatedAndSubmitted,
  fn: (clck) => ({
    currencyFrom: clck.currencyFrom!,
    currencyTo: clck.currencyTo!,
    amount: clck.amount!,
    requisite: {
      crypto: {
        address: clck.requisite.crypto.address!,
        destinationTag: clck.requisite.crypto.destinationTag
      }
    }
  }),
  target: createExchangeFx.start
})

sample({
  clock: exchangeForm.fields.amount.change,
  source: { t: $t, limits: $$limitsModel.outputs.$limits },
  filter: (src, clck) =>
    clck !== '' &&
    (Number(clck) <= Number(src.limits?.min) ||
      Number(clck) >= Number(src.limits?.max)),
  fn: ({ t, limits }) =>
    t(AMOUNT_ERROR, {
      min: limits?.min,
      max: limits?.max
    }),
  target: exchangeForm.fields.amount.changeError
})

sample({
  clock: exchangeForm.fields.amount.change,
  source: { t: $t, limits: $$limitsModel.outputs.$limits },
  filter: (src, clck) =>
    (Number(clck) >= Number(src.limits?.min) &&
      Number(clck) <= Number(src.limits?.max)) ||
    clck === '',
  target: [exchangeForm.clearOuterErrors]
})

export const { tick, isRunning: $isPolling } = interval({
  start: startPollingEv,
  stop: stopPollingEv,
  timeout: 5000
})

sample({
  clock: tick,
  source: $exchangeId,
  filter: isNotNil,
  fn: (id) => ({ id: id! }),
  target: fetchExchangeFx.start
})

sample({
  clock: fetchExchangeFx.finished.success,
  filter: complement(
    pathEq(Statuses.STATUS_PENDING, ['result', 'exchange', 'status'])
  ),
  fn: T,
  target: [stopPollingEv, toggleModalEv]
})

sample({
  clock: toggleModalEv,
  target: $exchangeModalOpened
})

sample({
  clock: toggleModalEv,
  filter: equals(false),
  target: [fetchExchangeFx.reset, exchangeForm.reset]
})

sample({
  clock: ExchangeGate.open,
  target: [fetchExchangeFx.reset, exchangeForm.reset]
})

export * from './events'
export * from './store'
