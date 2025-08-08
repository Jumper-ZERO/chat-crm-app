import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { isAuthorizate } from '@/lib/api'

export const Route = createFileRoute('/(dashboard)')({
  loader: () => {
    if (!isAuthorizate()) {
      throw redirect({ to: '/login' })
    }
    return null
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
