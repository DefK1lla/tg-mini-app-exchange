import { Text } from '@telegram-apps/telegram-ui'
import { Exchange } from './model'

export const renderExchangeField = (
  key: keyof Exchange,
  value: string,
  locale: string,
  t: TFunction
) => {
  if (key === 'createdAt')
    return (
      <>
        <Text weight='1'>{t(key as TFunctionArg)}</Text>{' '}
        <Text>{new Date(value).toLocaleString(locale)}</Text>
      </>
    )
  if (key === 'status')
    return (
      <>
        <Text weight='1'>{t(key as TFunctionArg)}</Text>{' '}
        <Text>{t(`status.${value}` as TFunctionArg)}</Text>
      </>
    )
  if (key === 'orders') return null
  return (
    <>
      <Text weight='1'>{t(key as TFunctionArg)}</Text> <Text>{value}</Text>
    </>
  )
}
