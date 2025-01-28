import {
  Exchange,
  fetchExchangeFx,
  renderExchangeField
} from '@/entities/exchange'
import { Pending } from '@/shared/ui/pending'
import { List, Placeholder } from '@telegram-apps/telegram-ui'
import { useGate, useUnit } from 'effector-react'
import { map, pipe } from 'ramda'
import { useTranslation } from 'react-i18next'
import { ExchangeGate } from '../model'

export const ExchangeInfo = ({ id }: { id?: string | null }) => {
  useGate(ExchangeGate, { id })
  const { t, i18n } = useTranslation()

  const { exchange, isPending } = useUnit({
    exchange: fetchExchangeFx.$data.map((r) => r?.exchange),
    isPending: fetchExchangeFx.$pending
  })

  if (isPending) return <Pending />

  if (!exchange)
    return (
      <Placeholder
        header={t('common.oops')}
        description={
          <>
            <div style={{ marginBottom: 15 }}>{t('exchange.not_found')}</div>
          </>
        }
      >
        <img
          alt='Telegram sticker'
          src='https://xelene.me/telegram.gif'
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    )

  return (
    <List>
      {pipe(
        Object.entries,
        map(([key, value]) => (
          <div key={key}>
            {renderExchangeField(
              key as keyof Exchange,
              value,
              i18n.language,
              t
            )}
          </div>
        ))
      )(exchange)}
    </List>
  )
}
