import { RoutesList, URLS } from '@/shared/model/router'
import { Exchange } from '@/widgets/exchange'
import { History } from '@/widgets/history'
import { Login } from '@/widgets/login'
import { Register } from '@/widgets/register'
import { Settings } from '@/widgets/settings'
import { RouteObject } from 'react-router'

export type RouteType = RouteObject & {
  onlyPublic?: boolean
  onlyPrivate?: boolean
}

export const routes: RouteType[] = [
  {
    path: URLS[RoutesList.SIGN_IN],
    element: <Login />,
    onlyPublic: true
  },
  {
    path: URLS[RoutesList.SIGN_UP],
    element: <Register />,
    onlyPublic: true
  },
  {
    path: URLS[RoutesList.EXCHANGE],
    element: <Exchange />,
    onlyPrivate: true
  },
  {
    path: URLS[RoutesList.SETTINGS],
    element: <Settings />
  },
  {
    path: URLS[RoutesList.HISTORY],
    element: <History />
  }
]
