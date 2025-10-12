import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import {
  differenceInDays,
  format,
  isThisYear,
  isToday,
  isYesterday,
} from 'date-fns'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getChatList, getMessagesByChatId } from '@/services/chat.service'
import {
  ArrowLeft,
  MoreVertical,
  Edit,
  Paperclip,
  ImagePlus,
  Plus,
  Search as SearchIcon,
  Send,
  MessagesSquare,
  User,
} from 'lucide-react'
import { parsePhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useSocket } from '@/context/socket-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import type { Chat, Contact, Message } from '@/features/chats/data/schema'
import { NewChat } from './components/new-chat'

export function getChatDateLabel(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diffDays = differenceInDays(now, d)

  if (isToday(date)) return 'Hoy'
  if (isYesterday(date)) return 'Ayer'
  if (diffDays <= 7) return format(date, 'EEEE')
  if (isThisYear(date)) return format(date, "d 'de' MMMM")
  return format(date, "d 'de' MMMM 'de' yyyy")
}

export function groupMessagesByDate(
  messages: Message[]
): Record<string, Message[]> {
  const groups = messages.reduce(
    (acc, msg) => {
      const dateKey: string = format(new Date(msg.createdAt), 'yyyy-MM-dd')
      acc[dateKey] = acc[dateKey] ? [...acc[dateKey], msg] : [msg]
      return acc
    },
    {} as Record<string, Message[]>
  )

  for (const date in groups) {
    groups[date].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const sortedGroups = Object.fromEntries(
    Object.entries(groups).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
    )
  )

  return sortedGroups
}

export function Chats() {
  const [search, setSearch] = useState('')
  const { socket } = useSocket()
  const [messageInput, setMessageInput] = useState<string>('')
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [mobileSelectedChat, setMobileSelectedChat] = useState<Chat | null>(
    null
  )
  const [createConversationDialogOpened, setCreateConversationDialog] =
    useState(false)
  const queryClient = useQueryClient()

  const handleNewChatCreated = (newContact: Contact) => {
    if (!newContact) return

    const tempChat: Chat = {
      id: `temp-${newContact.id}`,
      contact: newContact,
      lastMessage: {
        body: '',
        direction: 'out',
        type: 'text',
        status: 'sent',
        createdAt: new Date().toISOString(),
      },
      priority: 'low',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    setSelectedChat(tempChat)
    setMobileSelectedChat(tempChat)
  }

  const handleSendMessage = (body: string) => {
    socket?.emit('send-message', {
      chat: selectedChat?.id,
      to: selectedChat?.contact.phoneNumber,
      body,
    })
  }

  useEffect(() => {
    if (!socket || !selectedChat?.id) return

    const handleNewMessage = (newMessage: Message) => {
      queryClient.setQueryData(
        ['chat', selectedChat.id, 'messages'],
        (oldMessages: Message[] | undefined) => {
          if (!oldMessages) return [newMessage]
          return [...oldMessages, newMessage]
        }
      )

      queryClient.setQueryData(
        ['chat', 'list'],
        (oldChats: Chat[] | undefined) => {
          if (!oldChats) return oldChats
          return oldChats.map((chat) => {
            if (chat.id === selectedChat?.id) {
              return { ...chat, lastMessage: newMessage }
            }
            return chat
          })
        }
      )
    }

    socket.on('new-message', handleNewMessage)

    socket.on('notification', (data) => {
      toast.info(data.message)
    })

    // Cleanup
    return () => {
      socket.off('new-message', handleNewMessage)
      socket.off('notification')
    }
  }, [socket, selectedChat?.id, queryClient])

  const { data: conversations = [] } = useQuery({
    queryKey: ['chat', 'list'],
    queryFn: getChatList,
    placeholderData: (prev) => prev,
  })

  // Filtered data based on the search query
  const filteredChatList: Chat[] = conversations.filter(({ contact }) => {
    if (search.trim() === '') return true
    return contact?.username
      ?.toLowerCase()
      ?.includes(search.trim().toLowerCase())
  })

  const { data: currentMessages } = useQuery({
    queryKey: ['chat', selectedChat?.id, 'messages'],
    queryFn: () => getMessagesByChatId(selectedChat!.id),
    enabled: !!selectedChat?.id,
    select: groupMessagesByDate,
  })

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          {/* Left Side */}
          <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div
              className={cn(
                'bg-background sticky top-0 z-10 -mx-4 px-4 pb-3',
                'shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'
              )}
            >
              <div className='flex items-center justify-between py-2'>
                <div className='flex gap-2'>
                  <h1 className='text-2xl font-bold'>Inbox</h1>
                  <MessagesSquare size={20} />
                </div>

                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => setCreateConversationDialog(true)}
                  className='rounded-lg'
                >
                  <Edit size={24} className='stroke-muted-foreground' />
                </Button>
              </div>

              <label
                className={cn(
                  'focus-within:ring-ring focus-within:ring-1 focus-within:outline-hidden',
                  'border-border flex h-10 w-full items-center space-x-0 rounded-md border ps-2'
                )}
              >
                <SearchIcon size={15} className='me-2 stroke-slate-500' />
                <span className='sr-only'>Search</span>
                <input
                  type='text'
                  className='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
                  placeholder='Search chat...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <ScrollArea className='-mx-3 h-full overflow-scroll p-3'>
              {filteredChatList.map((chatUsr) => {
                const { id, lastMessage, contact } = chatUsr
                const lastMsg =
                  lastMessage?.direction === 'out'
                    ? `Yo: ${lastMessage.body}`
                    : lastMessage?.body
                return (
                  <Fragment key={id}>
                    <button
                      type='button'
                      className={cn(
                        'group hover:bg-accent hover:text-accent-foreground',
                        `flex w-full rounded-md px-2 py-2 text-start text-sm`,
                        selectedChat?.id === id && 'sm:bg-muted'
                      )}
                      onClick={() => {
                        setSelectedChat(chatUsr)
                        setMobileSelectedChat(chatUsr)
                      }}
                    >
                      <div className='flex gap-2'>
                        <Avatar>
                          <AvatarImage
                            src={contact?.profile}
                            alt={contact?.username}
                          />
                          <AvatarFallback className='font-bold'>
                            {contact?.username?.charAt(0) || <User />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className='col-start-2 row-span-2 font-medium'>
                            {contact?.username ??
                              parsePhoneNumber(
                                contact?.phoneNumber ?? '',
                                'PE'
                              )?.formatNational() ??
                              'unknown'}
                          </span>
                          <span
                            className={cn(
                              'col-start-2 row-span-2 row-start-2 line-clamp-2',
                              'text-muted-foreground group-hover:text-accent-foreground/90 text-ellipsis'
                            )}
                          >
                            {lastMsg}
                          </span>
                        </div>
                      </div>
                    </button>
                    <Separator className='my-1' />
                  </Fragment>
                )
              })}
            </ScrollArea>
          </div>

          {/* Right Side */}
          {selectedChat ? (
            <div
              className={cn(
                'bg-background absolute inset-0 start-full z-50 hidden w-full',
                'flex-1 flex-col border shadow-xs sm:static sm:z-auto sm:flex sm:rounded-md',
                mobileSelectedChat && 'start-0 flex'
              )}
            >
              {/* Top Part */}
              <div className='bg-card mb-1 flex flex-none justify-between p-4 shadow-lg sm:rounded-t-md'>
                {/* Left */}
                <div className='flex gap-3'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='-ms-2 h-full sm:hidden'
                    onClick={() => setMobileSelectedChat(null)}
                  >
                    <ArrowLeft className='rtl:rotate-180' />
                  </Button>
                  <div className='flex items-center gap-2 lg:gap-4'>
                    <Avatar className='size-9 lg:size-11'>
                      <AvatarImage
                        src={selectedChat.contact?.profile}
                        alt={selectedChat.contact?.username}
                      />
                      <AvatarFallback className='font-bold'>
                        {selectedChat.contact?.username?.charAt(0) ?? 'N/A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                        {selectedChat?.contact?.username ?? 'Desconocido'}
                      </span>
                      <span
                        className={cn(
                          'text-muted-foreground col-start-2 row-span-2 row-start-2',
                          'line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis lg:max-w-none lg:text-sm'
                        )}
                      >
                        {parsePhoneNumber(
                          selectedChat.contact.phoneNumber,
                          'PE'
                        )?.formatInternational() ||
                          selectedChat.contact.username}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className='-me-1 flex items-center gap-1 lg:gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'
                  >
                    <MoreVertical className='stroke-muted-foreground sm:size-5' />
                  </Button>
                </div>
              </div>

              {/* Conversation */}
              <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4'>
                <div className='flex size-full flex-1'>
                  <div className='chat-text-container relative -me-4 flex flex-1 flex-col overflow-y-hidden'>
                    <div className='chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pe-4 pb-4'>
                      {currentMessages &&
                        Object.keys(currentMessages).map((key) => (
                          <Fragment key={key}>
                            {currentMessages[key].map((msg, index) => (
                              <div
                                key={`${selectedChat.contact.username ?? 'N/A'}-${msg.createdAt}-${index}`}
                                className={cn(
                                  'chat-box max-w-72 px-3 py-2 break-words shadow-lg',
                                  msg.direction === 'out'
                                    ? 'bg-primary/90 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]'
                                    : 'bg-muted self-start rounded-[16px_16px_16px_0]'
                                )}
                              >
                                {msg.body}{' '}
                                <span
                                  className={cn(
                                    'text-foreground/75 mt-1 block text-xs font-light italic',
                                    msg.direction === 'out' &&
                                      'text-primary-foreground/85 text-end'
                                  )}
                                >
                                  {format(msg.createdAt, 'h:mm a')}
                                </span>
                              </div>
                            ))}
                            <div className='text-center text-xs'>
                              {getChatDateLabel(key)}
                            </div>
                          </Fragment>
                        ))}
                    </div>
                  </div>
                </div>
                <form
                  className='flex w-full flex-none gap-2'
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(messageInput)
                    setMessageInput('')
                  }}
                >
                  <div
                    className={cn(
                      'border-input bg-card focus-within:ring-ring flex flex-1 items-center',
                      'gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4'
                    )}
                  >
                    <div className='space-x-1'>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='h-8 rounded-md'
                      >
                        <Plus size={20} className='stroke-muted-foreground' />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='hidden h-8 rounded-md lg:inline-flex'
                      >
                        <ImagePlus
                          size={20}
                          className='stroke-muted-foreground'
                        />
                      </Button>
                      <Button
                        size='icon'
                        type='button'
                        variant='ghost'
                        className='hidden h-8 rounded-md lg:inline-flex'
                      >
                        <Paperclip
                          size={20}
                          className='stroke-muted-foreground'
                        />
                      </Button>
                    </div>
                    <label className='flex-1'>
                      <span className='sr-only'>Chat Text Box</span>
                      <Input
                        placeholder='Type your messages...'
                        className='h-8 w-full bg-inherit focus-visible:outline-hidden'
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                    </label>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='hidden sm:inline-flex'
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                  <Button className='h-full sm:hidden'>
                    <Send size={18} /> Send
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'bg-card absolute inset-0 start-full z-50 hidden w-full',
                'flex-1 flex-col justify-center rounded-md border shadow-xs sm:static sm:z-auto sm:flex'
              )}
            >
              <div className='flex flex-col items-center space-y-6'>
                <div className='border-border flex size-16 items-center justify-center rounded-full border-2'>
                  <MessagesSquare className='size-8' />
                </div>
                <div className='space-y-2 text-center'>
                  <h1 className='text-xl font-semibold'>Your messages</h1>
                  <p className='text-muted-foreground text-sm'>
                    Send a message to start a chat.
                  </p>
                </div>
                <Button onClick={() => setCreateConversationDialog(true)}>
                  Send message
                </Button>
              </div>
            </div>
          )}
        </section>
        <NewChat
          onChatCreated={handleNewChatCreated}
          onOpenChange={setCreateConversationDialog}
          open={createConversationDialogOpened}
        />
      </Main>
    </>
  )
}
