import { Plus } from "lucide-react"
import { useState } from "react"

import { ChatInput } from "./chat-input"
import { ChatMessage } from "./chat-message"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { initialsName, numberFormat } from "@/lib/format"
import { useT } from "@/lib/i18n/useT"
import type { MessageData, UserContact } from "@/types/chat"


export const ChatCard = ({ messages, contact }: { messages?: MessageData[], contact: UserContact }) => {
  const [chatMessages, setChatMessages] = useState(messages || [])
  const hasMessages = chatMessages && chatMessages.length > 0

  const addMessage = (msg: string) => {
    const newMessage: MessageData = { content: msg, isSent: true }
    setChatMessages(prev => [...prev, newMessage])
  }

  const renderedMessages = chatMessages?.map((m, i) => (
    <ChatMessage key={i} content={m.content} isSent={m.isSent} />
  ))

  return (
    <Card>
      <CardHeader>
        <ChatCardHeader name={contact?.fullName} phone={contact.phoneNumber} />
        <CardAction><Plus /></CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {hasMessages ? renderedMessages : <ChatCardEmpty />}
      </CardContent>
      <CardFooter>
        <ChatInput onSend={addMessage} />
      </CardFooter>
    </Card>
  )
}

const ChatCardHeader = ({ name, phone }: { name?: string, phone: string }) => {
  const { t } = useT();
  const initials = initialsName(name || "");
  const phoneFormat = numberFormat(phone);

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="size-12">
        <AvatarFallback className="font-bold">{initials}</AvatarFallback>
      </Avatar>
      <CardTitle className="flex flex-col space-y-1 items-start">
        <p className="font-bold">{name || t("chat.user.unknown")}</p>
        <p className="text-sm text-muted-foreground">{phoneFormat}</p>
      </CardTitle>
    </div>
  )
}

const ChatCardEmpty = () => {
  const { t } = useT();
  return (
    <div className="flex items-center justify-center h-full">
      <h3 className="scroll-m-20 text-center py-7 text-2xl font-semibold tracking-tight">
        {t("chat.empty")}
      </h3>
    </div>
  )
}