import { FieldError } from '@effector-reform/core'
import { Select, Text } from '@telegram-apps/telegram-ui'
import { useUnit } from 'effector-react'
import { compose, map, pathOr } from 'ramda'
import { $currencyList } from '../model'

export const CurrencySelect = ({
  currencyList,
  onChange,
  value = '',
  label,
  error
}: {
  currencyList?: string[]
  onChange: (value: string) => void
  value?: string | null
  label?: string
  error?: FieldError
}) => {
  const currencies = useUnit($currencyList)
  return (
    <>
      <Select
        onChange={compose(onChange, pathOr('', ['target', 'value']))}
        value={value || ''}
        header={label}
      >
        <option disabled value=''></option>
        {map(
          (c: string) => (
            <option key={c} value={c}>
              {c.startsWith('CURRENCY_') ? c.replace('CURRENCY_', '') : c}
            </option>
          ),
          currencyList || currencies
        )}
      </Select>
      {error && (
        <div style={{ padding: '0 22px' }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </div>
      )}
    </>
  )
}
