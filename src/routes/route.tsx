import { createFileRoute, Navigate } from '@tanstack/react-router'

import { Route as chatRoute } from '@/routes/(dashboard)/chats'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    return null
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to={chatRoute.to} />
}
