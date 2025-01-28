import { ClientGate } from '@/entities/client'
import { IconHistory, IconSettngs, IconSwap } from '@/shared/assets'
import { RoutesList, URLS } from '@/shared/model/router'
import { Tabbar } from '@telegram-apps/telegram-ui'
import { useGate } from 'effector-react'
import { PropsWithChildren, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

const items: Array<{
  value: string
  label: TFunctionArg
  icon: ReactNode
}> = [
  {
    value: URLS[RoutesList.EXCHANGE],
    label: 'bottom_bar.exchange',
    icon: <IconSwap />
  },
  {
    value: URLS[RoutesList.HISTORY],
    label: 'bottom_bar.history',
    icon: <IconHistory />
  },
  {
    value: URLS[RoutesList.SETTINGS],
    label: 'bottom_bar.settings',
    icon: <IconSettngs />
  }
]

export const MainLayout = ({ children }: PropsWithChildren) => {
  useGate(ClientGate)
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--tg-bg-color)', paddingBottom: 120 }}>
      {children}
      <Tabbar>
        {items.map((i) => (
          <Tabbar.Item
            key={i.value}
            text={t(i.label)}
            selected={i.value === location.pathname}
            onClick={() => navigate(i.value)}
          >
            {i.icon}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  )
}
