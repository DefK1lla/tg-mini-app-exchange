import { ElementType } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { routes, RouteType } from './model'
import { Private } from './private'
import { Public } from './public'

const Router = ({ layout }: { layout?: ElementType }) => {
  const Layout = layout || 'div'

  const renderRoute = (route: RouteType) => {
    if (route.onlyPrivate) {
      return (
        <Private>
          <Layout>{route.element}</Layout>
        </Private>
      )
    } else if (route.onlyPublic) {
      return (
        <Public>
          <Layout>{route.element}</Layout>
        </Public>
      )
    }

    return <Layout>{route.element}</Layout>
  }

  return (
    <HashRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={renderRoute(route)}
          />
        ))}
        <Route path='*' element={<Navigate to='/exchange' />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
