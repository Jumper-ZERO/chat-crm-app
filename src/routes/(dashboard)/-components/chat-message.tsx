export const ChatMessage = ({ msg, isSent = false }: { msg: string, isSent?: boolean }) => {
  return (
    <div className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${isSent ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'}`}>
      {msg}
    </div>
  )
}
