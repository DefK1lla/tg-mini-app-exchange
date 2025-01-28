import { createFactory } from '@withease/factories'
import { sample } from 'effector'
import { fetchRateFx } from './effects'
import { RateModelProps } from './types'

export const createRateModel = createFactory(
  ({ $currencyFrom, $currencyTo, $amount, $limits }: RateModelProps) => {
    sample({
      clock: [$currencyFrom, $currencyTo, $amount],
      source: {
        currencyFrom: $currencyFrom,
        currencyTo: $currencyTo,
        amount: $amount,
        limits: $limits
      },
      filter: (src) =>
        !!src.amount &&
        !!src.currencyFrom &&
        !!src.currencyTo &&
        !!src.limits &&
        Number(src.limits.min) < Number(src.amount) &&
        Number(src.limits?.max) > Number(src.amount),
      fn: (src) => ({
        currencyTo: src.currencyTo!,
        currencyFrom: src.currencyFrom!,
        amount: src.amount!
      }),
      target: fetchRateFx.start
    })

    return {
      outputs: {
        $rate: fetchRateFx.$data
      }
    }
  }
)

export * from './effects'
export * from './endpoints'
export * from './schema'
// export * from './store'
export * from './types'
