import { ArrowUp } from "lucide-react"
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/lib/i18n/useT";

export const ChatInput = ({ onSend }: { onSend?: (msg: string) => void }) => {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useT();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = input.trim();
    if (message) {
      onSend?.(message)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // Reset height
      el.style.height = `${el.scrollHeight}px`; // Set to scroll height
    }
  }, [input])

  return (
    <div className="flex items-center w-full">
      <form className="relative w-full" onSubmit={handleSubmit}>
        <Textarea
          id="message"
          ref={textareaRef}
          placeholder={t("chat.placeholder")}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={input}
          autoComplete="off"
          className="w-full resize-none overflow-hidden rounded-md border px-4 py-2 text-base md:text-sm pr-10 h-9 min-h-[2.40rem] max-h-[12rem] leading-5"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full size-6 p-0"
          disabled={!input.trim()}
        >
          <ArrowUp className="size-3.5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}