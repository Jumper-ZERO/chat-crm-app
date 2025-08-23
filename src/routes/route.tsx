import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Route as loginRoute } from '@/routes/(auth)/login'
import { Route as chatRoute } from '@/routes/(dashboard)/chats'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: loginRoute.to })
    } else {
      throw redirect({ to: chatRoute.to })
    }
  },
  component: () => <Outlet />,
})
