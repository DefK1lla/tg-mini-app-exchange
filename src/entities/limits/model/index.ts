import { createFactory } from '@withease/factories'
import { sample } from 'effector'
import { isNotNil } from 'ramda'
import { fetchLimtisFx } from './effects'
import { LimitsModelProps } from './types'

export const createLimitsModel = createFactory(
  ({ $currency }: LimitsModelProps) => {
    sample({
      clock: $currency,
      filter: isNotNil,
      fn: (currency) => ({ currency: currency! }),
      target: fetchLimtisFx.start
    })

    return {
      outputs: {
        $limits: fetchLimtisFx.$data
      }
    }
  }
)

export * from './effects'
export * from './endpoints'
export * from './schema'
export * from './types'
