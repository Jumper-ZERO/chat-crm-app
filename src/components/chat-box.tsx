import { ChatMessage } from "@/components/ui/chat-message"
import { MessageInputDemo } from "./message-input"

export default function ChatBox() {
  return (
    <div className="w-full space-y-2">
      <ChatMessage id="1" role="user" content="Hello! What is your name?" />
      <ChatMessage
        id="2"
        role="assistant"
        content="Hello! I go by ChatGPT. How are you?"
      />
      <MessageInputDemo />
    </div>
  )
}