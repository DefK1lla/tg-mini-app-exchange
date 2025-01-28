import { fetchExchangeFx } from '@/entities/exchange'
import { sample } from 'effector'
import { createGate } from 'effector-react'
import { compose, isNotNil, prop } from 'ramda'

export const ExchangeGate = createGate<{ id?: string | null }>()

sample({
  clock: ExchangeGate.open,
  filter: compose(isNotNil, prop('id')),
  fn: (clck) => ({ id: clck.id! }),
  target: fetchExchangeFx.start
})
