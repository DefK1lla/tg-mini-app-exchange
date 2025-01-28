import { sample } from 'effector'
import { setSelectedEv } from './events'
import { $selected } from './store'

sample({
  clock: setSelectedEv,
  target: $selected
})

export * from './config'
export * from './events'
export * from './store'
