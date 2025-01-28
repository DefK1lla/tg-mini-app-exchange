import { createEvent } from 'effector'
import { interval } from 'patronum'
import { RegisterSteps } from './types'

export const registerNextStepEv = createEvent()
export const registerPrevStepEv = createEvent()
export const setRegisterStep = createEvent<RegisterSteps>()
export const createNewCodeEv = createEvent()
export const setCode = createEvent<string>()
export const startTimer = createEvent()
export const stopTimer = createEvent()
export const verifyEv = createEvent()

export const { tick } = interval({
  start: startTimer,
  stop: stopTimer,
  timeout: 1000
})
