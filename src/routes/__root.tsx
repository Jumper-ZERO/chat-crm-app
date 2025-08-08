import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import * as React from 'react'

import type { AuthUser } from '@/types/user';

interface RouteAppContext {
  auth: {
    isAuthenticated: boolean;
    user?: AuthUser;
  }
}

export const Route = createRootRouteWithContext<RouteAppContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
