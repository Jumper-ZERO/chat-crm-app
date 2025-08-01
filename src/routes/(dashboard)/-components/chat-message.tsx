import type { MessageData } from "@/types/chat"

export const ChatMessage = ({ content, isSent = false }: MessageData) => {
  return (
    <div className={`
        flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 
        text-sm whitespace-pre-wrap break-words 
        ${isSent ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
      }`}>
      {content}
    </div>
  )
}
