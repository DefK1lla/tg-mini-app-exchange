import { $cryptoList, $fiatList, CurrencySelect } from '@/entities/currency'
import { createExchangeFx } from '@/entities/exchange'
import { ExchangeInfo } from '@/features/exchange'
import { Input } from '@/shared/ui/input'
import { Pending } from '@/shared/ui/pending'
import { useForm } from '@effector-reform/react'
import { Button, Modal, Section, Text } from '@telegram-apps/telegram-ui'
import { useGate, useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import {
  $$rateModel,
  $exchange,
  $exchangeModalOpened,
  $isPolling,
  $requisites,
  exchangeForm,
  ExchangeGate,
  startPollingEv,
  toggleModalEv
} from './model'

export const Exchange = () => {
  useGate(ExchangeGate)

  const form = useForm(exchangeForm)

  const errors = useUnit({
    currencyFrom: exchangeForm.fields.currencyFrom.$error,
    currencyTo: exchangeForm.fields.currencyTo.$error,
    amount: exchangeForm.fields.amount.$error,
    address: exchangeForm.fields.requisite.crypto.address.$error,
    destinationTag: exchangeForm.fields.requisite.crypto.destinationTag.$error
  })

  const {
    crypto,
    fiat,
    rate,
    isPending,
    requisites,
    isPolling,
    exchange,
    modalStatus
  } = useUnit({
    crypto: $cryptoList,
    fiat: $fiatList,
    rate: $$rateModel.outputs.$rate,
    isPending: createExchangeFx.$pending,
    requisites: $requisites,
    isPolling: $isPolling,
    exchange: $exchange,
    modalStatus: $exchangeModalOpened
  })

  const { t } = useTranslation()

  if (isPending || isPolling) return <Pending />

  if (requisites) {
    return (
      <>
        <Section header={t('exchange.requisites')}>
          <div style={{ padding: '0 22px' }}>
            <Text>{t('exchange.send_money')}</Text>

            {requisites.card?.holder && (
              <>
                <div>
                  <Text weight='1'>{t('common.holder')}:</Text>
                </div>
                <Text>{requisites.card.holder}</Text>
              </>
            )}

            <div style={{ marginBottom: 22 }}>
              {requisites.card?.number && (
                <>
                  <div>
                    <Text weight='1'>{t('common.number')}:</Text>
                  </div>
                  <Text>{requisites.card.number}</Text>
                </>
              )}
            </div>

            <Button onClick={() => startPollingEv()} stretched>
              {t('exchange.sended')}
            </Button>
          </div>
        </Section>

        <Modal open={modalStatus} onOpenChange={toggleModalEv}>
          <ExchangeInfo id={exchange?.id} />
        </Modal>
      </>
    )
  }

  return (
    <form onSubmit={form.onSubmit}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%' }}>
          <CurrencySelect
            value={form.values.currencyFrom}
            onChange={form.fields.currencyFrom.onChange}
            label={t('exchange.give')}
            currencyList={fiat}
            error={errors.currencyFrom}
          />
        </div>
        <div style={{ width: '50%' }}>
          <CurrencySelect
            value={form.values.currencyTo}
            onChange={form.fields.currencyTo.onChange}
            label={t('exchange.get')}
            currencyList={crypto}
            error={errors.currencyTo}
          />
        </div>
      </div>
      <Input
        inputProps={{
          header: t('exchange.give'),
          type: 'number',
          after: form.values.currencyFrom?.replace('CURRENCY_', ''),
          placeholder: t('exchange.amount')
        }}
        value={form.values.amount}
        onChange={form.fields.amount.onChange}
        error={errors.amount}
      />
      <Input
        inputProps={{
          header: t('exchange.get'),
          type: 'number',
          readOnly: true,
          after: form.values.currencyTo?.replace('CURRENCY_', '')
        }}
        value={Number(rate?.rate) * Number(form.values.amount)}
      />

      {rate && !errors.amount && (
        <Section header={t('exchange.rate')}>
          <div style={{ padding: '0 22px', minHeight: 26 }}>
            <Text>
              1 {form.values.currencyFrom?.replace('CURRENCY_', '')} ~{' '}
              {rate.rate} {form.values.currencyTo?.replace('CURRENCY_', '')}
            </Text>
          </div>
        </Section>
      )}

      <Section header={t('exchange.requisites')}>
        <Input
          inputProps={{ header: t('exchange.address') }}
          value={form.values.requisite.crypto.address}
          onChange={form.fields.requisite.crypto.address.onChange}
          error={errors.address}
        />
        <Input
          inputProps={{ header: t('exchange.destination_tag') }}
          value={form.values.requisite.crypto.destinationTag}
          onChange={form.fields.requisite.crypto.destinationTag.onChange}
          error={errors.destinationTag}
        />
      </Section>

      <div style={{ padding: '0 22px' }}>
        <Button style={{ width: '100%' }} type='submit'>
          {t('exchange.exchange')}
        </Button>
      </div>
    </form>
  )
}
