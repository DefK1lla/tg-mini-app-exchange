import { logoutFx } from '@/shared/model/effects'
import { AUTH_URLS, routerInstanceChanged } from '@/shared/model/router'
import { Pending } from '@/shared/ui/pending'
import { useUnit } from 'effector-react'
import { always, ifElse, includes } from 'ramda'
import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AuthLayout } from './auth'
import { MainLayout } from './main'

export const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    routerInstanceChanged(navigate)
  }, [])

  const CurrentLayout = ifElse(
    includes(location.pathname),
    always(AuthLayout),
    always(MainLayout)
  )(Object.values(AUTH_URLS))

  const { isLogouting } = useUnit({ isLogouting: logoutFx.$pending })

  if (isLogouting) return <Pending />

  return <CurrentLayout>{children}</CurrentLayout>
}
