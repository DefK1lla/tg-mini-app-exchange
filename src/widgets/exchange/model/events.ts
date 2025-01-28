import { createEvent } from 'effector'

export const startPollingEv = createEvent()
export const stopPollingEv = createEvent()
export const toggleModalEv = createEvent<boolean>()
