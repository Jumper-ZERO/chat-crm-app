import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { me } from '@/lib/api/auth'
import { Route as LoginRoute } from '@/routes/(auth)/login'

export const Route = createFileRoute('/(dashboard)')({
  beforeLoad: async ({ context }) => {
    context.user = context?.user ?? await me()
    if (!context.user) throw redirect({ to: LoginRoute.to, replace: true })
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className='flex flex-col gap-6 p-6 md:p-10'>
      <Outlet />
    </div>
  )
}
