"use client"

import { useRef, useState } from "react"
import { ChatForm } from "@/components/ui/chat"
import { MessageInput } from "@/components/ui/message-input"
import { transcribeAudio } from "@/lib/utils/audio"

export function MessageInputDemo() {
  const [value, setValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const timeout = useRef<number | null>(null)
 
  const cancelTimeout = () => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }
  }
 
  const setNewTimeout = (callback: () => void, ms: number) => {
    cancelTimeout()
    const id = window.setTimeout(callback, ms)
    timeout.current = id
  }
 
  return (
    <ChatForm
      className="w-full"
      isPending={false}
      handleSubmit={(event) => {
        event?.preventDefault?.()
        setValue("")
        setIsGenerating(true)
        setNewTimeout(() => {
          setIsGenerating(false)
        }, 2000)
      }}
    >
      {({ files, setFiles }) => (
        <MessageInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Escribe aqui..."
          allowAttachments
          files={files}
          setFiles={setFiles}
          stop={() => {
            setIsGenerating(false)
            cancelTimeout()
          }}
          isGenerating={isGenerating}
          transcribeAudio={transcribeAudio}
        />
      )}
    </ChatForm>
  )
}