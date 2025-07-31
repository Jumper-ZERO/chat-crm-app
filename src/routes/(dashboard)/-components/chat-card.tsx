import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import type { ReactElement } from "react"

export const ChatCard = ({ messages }: { messages?: ReactElement<typeof ChatMessage>[] }) => {
  const hasMessages = messages && messages.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="size-12">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="flex flex-col space-y-1 items-start">
            <p>Nombre</p>
            <p className="text-sm text-gray-500">+51 988 989 989</p>
          </CardTitle>
        </div>
        <CardAction><Plus /></CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {hasMessages ? messages : (
          <h3 className="scroll-m-20 text-center py-7 text-2xl font-semibold tracking-tight">
            No hay mensajes aún
          </h3>
        )}
      </CardContent>
      <CardFooter>
        <ChatInput />
      </CardFooter>
    </Card>
  )
}