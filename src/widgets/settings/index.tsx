import { Client, fetchClientInfoFx, renderClientField } from '@/entities/client'
import { LangCode } from '@/features/i18n'
import {
  List,
  Section,
  SegmentedControl,
  Text
} from '@telegram-apps/telegram-ui'
import { useUnit } from 'effector-react'
import { map, pipe } from 'ramda'
import { useTranslation } from 'react-i18next'

export const Settings = () => {
  const { t, i18n } = useTranslation()
  const { client } = useUnit({
    client: fetchClientInfoFx.$data.map((d) => d?.client)
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Section header={t('common.language')}>
        <SegmentedControl>
          <SegmentedControl.Item
            onClick={() => i18n.changeLanguage(LangCode.EN)}
            selected={i18n.language === LangCode.EN}
          >
            EN
          </SegmentedControl.Item>
          <SegmentedControl.Item
            onClick={() => i18n.changeLanguage(LangCode.KA)}
            selected={i18n.language === LangCode.KA}
          >
            KA
          </SegmentedControl.Item>
        </SegmentedControl>
      </Section>

      {client && (
        <Section header={t('client.info')}>
          <List style={{ padding: '0 22px' }}>
            {pipe(
              Object.entries,
              map(([k, v]) => (
                <div key={k}>
                  <Text weight='1'>{t(`client.${k}` as TFunctionArg)}:</Text>{' '}
                  <Text>
                    {renderClientField(k as keyof Client, v, i18n.language, t)}
                  </Text>
                </div>
              ))
            )(client)}
          </List>
        </Section>
      )}
    </div>
  )
}
