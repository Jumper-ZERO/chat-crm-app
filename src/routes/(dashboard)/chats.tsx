import { createFileRoute } from '@tanstack/react-router'

import { ChatCard } from '@/routes/(dashboard)/-components/chat-card'
import type { MessageData } from '@/types/chat'

export const Route = createFileRoute('/(dashboard)/chats')({
  component: RouteComponent,
})

function RouteComponent() {
  const messages: MessageData[] = [
    { content: "Hola, ¿cómo estás?", isSent: true },
    { content: "Estoy bien, gracias" },
    { content: "¿Y tú?" },
    { content: "Tambien estoy bien, gracias.", isSent: true },
  ]

  return (
    <div className='flex flex-col gap-6 p-6 md:p-10'>
      <ChatCard messages={messages} contact={{
        fullName: "John Doe",
        phoneNumber: '51 123456789'
      }} />
    </div>
  )
}
