import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Route as loginRoute } from '@/routes/(auth)/login'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to={loginRoute.to} />
}
