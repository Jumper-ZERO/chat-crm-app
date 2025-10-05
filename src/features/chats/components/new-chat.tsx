import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchContacts } from '@/services/contact.service'
import { Check, CircleUser, User, X } from 'lucide-react'
import { parsePhoneNumber } from 'react-phone-number-input'
import { useDebounce } from 'use-debounce'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Message } from '@/features/chats/data/schema'
import type { Contact } from '@/features/contacts/data/schema'

type NewChatProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  messages: Record<string, Message>
  onChatCreated?: (chat: any) => void
}

export function NewChat({ onChatCreated, onOpenChange, open }: NewChatProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 400)
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([])

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', debouncedSearch],
    queryFn: () => searchContacts(debouncedSearch),
    // enabled: debouncedSearch.length > 0,
  })
  console.log(contacts)

  const handleSelectUser = (contact: Contact) => {
    if (!selectedContacts.find((u) => u.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact])
    } else {
      handleRemoveUser(contact.id)
    }
  }

  const handleRemoveUser = (contactId: string) => {
    setSelectedContacts(
      selectedContacts.filter((contact) => contact.id !== contactId)
    )
  }

  useEffect(() => {
    if (!open) {
      setSelectedContacts([])
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Command className='rounded-lg border'>
            <CommandInput
              placeholder='Search people...'
              className='text-foreground'
            />
            <CommandList>
              <CommandEmpty>No people found.</CommandEmpty>
              <CommandGroup>
                {contacts?.map((contact) => (
                  <CommandItem
                    key={contact.id}
                    onSelect={() => handleSelectUser(contact)}
                    className='hover:bg-accent hover:text-accent-foreground flex items-center justify-between gap-2'
                  >
                    <div className='flex items-center gap-2'>
                      <Avatar>
                        <AvatarImage
                          src={contact.profile}
                          alt='Hallie Richards'
                        />
                        <AvatarFallback className='text-xs'>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      {/* <img
                        src={
                          contact.profile ||
                          'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
                        }
                        alt={contact.firstNames || contact.username}
                        className='h-8 w-8 rounded-full'
                      /> */}
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {contact.firstNames ??
                            parsePhoneNumber(
                              contact.phoneNumber,
                              'PE'
                            )?.formatInternational()}
                        </span>
                        <span className='text-accent-foreground/70 text-xs'>
                          {contact.username}
                        </span>
                      </div>
                    </div>

                    {selectedContacts.find((u) => u.id === contact.id) && (
                      <Check className='h-4 w-4' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            variant={'default'}
            onClick={() => showSubmittedData(selectedContacts)}
            disabled={selectedContacts.length === 0}
          >
            Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
