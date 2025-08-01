import { createFileRoute } from '@tanstack/react-router'

import { ChatCard } from '@/routes/(dashboard)/-components/chat-card'

export const Route = createFileRoute('/(dashboard)/chats')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='flex flex-col gap-6 p-6 md:p-10'>
      <ChatCard contact={{
        fullName: "John Doe",
        phoneNumber: '51 123456789'
      }} />
    </div>
  )
}
