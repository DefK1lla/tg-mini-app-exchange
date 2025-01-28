import { combine, Store } from 'effector'
import { concat, propOr } from 'ramda'
import { fetchCryptoFx, fetchFiatFx } from './effects'

export const $cryptoList = fetchCryptoFx.$data.map(
  propOr([], 'currencies')
) as Store<string[]>

export const $fiatList = fetchFiatFx.$data.map(
  propOr([], 'currencies')
) as Store<string[]>

export const $currencyList = combine($fiatList, $cryptoList, concat) as Store<
  string[]
>
