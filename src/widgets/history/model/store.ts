import { createStore } from 'effector'

export const $selected = createStore<string | null>(null)
