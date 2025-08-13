import { createFileRoute, Navigate } from '@tanstack/react-router'

import { Route as chatRoute } from '@/routes/(dashboard)/chats'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to={chatRoute.to} />
}
