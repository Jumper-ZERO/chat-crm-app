import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'

import type { RouteContext } from '@/types/route.types'

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </React.Fragment>
  )
}
