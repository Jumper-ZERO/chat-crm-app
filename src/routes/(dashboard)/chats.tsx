import { ChatCard } from '@/routes/(dashboard)/-components/chat-card'
import { ChatMessage } from '@/routes/(dashboard)/-components/chat-message'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/chats')({
  component: RouteComponent,
})

function RouteComponent() {
  const messages = [
    <ChatMessage key="1" msg="Hola, ¿cómo estás?" isSent={true} />,
    <ChatMessage key="2" msg="Estoy bien, gracias" />,
    <ChatMessage key="2" msg="¿Y tú?" />,
    <ChatMessage key="2" msg="Tambien estoy bien, gracias." isSent={true} />,
  ]

  return (
    <div className='flex flex-col gap-6 p-6 md:p-10'>
      <ChatCard messages={messages} />
    </div>
  )
}
