import { attach, createEvent, createStore, sample } from 'effector'
import { mergeRight } from 'ramda'
import { NavigateFunction } from 'react-router'

export enum RoutesList {
  SIGN_IN,
  SIGN_UP,
  EXCHANGE,
  HISTORY,
  SETTINGS
}

export const AUTH_URLS = {
  [RoutesList.SIGN_IN]: '/sign-in',
  [RoutesList.SIGN_UP]: '/sign-up'
}

export const URLS = mergeRight(AUTH_URLS, {
  [RoutesList.EXCHANGE]: '/exchange',
  [RoutesList.HISTORY]: '/history',
  [RoutesList.SETTINGS]: '/settings'
})

export const routerInstanceChanged = createEvent<NavigateFunction>()
export const goToRouteEv = createEvent<string>()

export const $router = createStore<NavigateFunction | null>(null)
$router.on(routerInstanceChanged, (_, p) => p)
export const goToRouteFx = attach({
  source: $router,
  effect: (push, param) => setTimeout(() => push && push(param), 500)
})

sample({
  clock: goToRouteEv,
  target: goToRouteFx
})
