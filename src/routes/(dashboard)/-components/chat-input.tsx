import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export const ChatInput = () => {
  return (
    <div className="flex items-center w-full">
      <form className="relative w-full">
        <Input
          id="message"
          placeholder="Type your message..."
          autoComplete="off"
          className="pr-10 h-9 text-base md:text-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full size-6 p-0"
          disabled
        >
          <ArrowUp className="size-3.5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}