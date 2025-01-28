import { IconCopy } from '@/shared/assets'
import { Badge, IconButton, Text } from '@telegram-apps/telegram-ui'
import { Client } from './model'

export const renderClientField = (
  key: keyof Client,
  value: string,
  locale: string,
  t: TFunction
) => {
  if (key === 'createdAt') return new Date(value).toLocaleString(locale)
  if (key === 'status')
    return <Badge type='number'>{t(`status.${value}` as TFunctionArg)}</Badge>
  if (key === 'referralToken')
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        title={t('common.copy')}
        onClick={() => navigator.clipboard.writeText(value)}
      >
        <Text>{value}</Text>
        <IconButton size='s'>
          <IconCopy />
        </IconButton>
      </div>
    )
  return value
}
