"use client"
 
import { useEffect, useRef, useState } from "react"
 
import { MessageList } from "@/components/ui/message-list"
 
export function MessageListDemo() {
  const effectRan = useRef(false)
  const [isTyping, setIsTyping] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "user",
      content: "Hello! What is your name?",
    },
  ])
 
  useEffect(() => {
    if (effectRan.current) return
    effectRan.current = true
 
    setTimeout(() => {
      setIsTyping(false)
      setMessages((messages) => [
        ...messages,
        {
          id: "2",
          role: "assistant",
          content: "Hello! I go by ChatGPT. How are you?",
        },
      ])
    }, 1500)
  }, [])
 
  return (
    <div className="w-full">
      <MessageList isTyping={isTyping} messages={messages} />
    </div>
  )
}