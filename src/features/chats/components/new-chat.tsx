import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchContacts } from '@/services/contact.service'
import { Check, User } from 'lucide-react'
import { parsePhoneNumber } from 'react-phone-number-input'
import { useDebounce } from 'use-debounce'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import type { Contact } from '@/features/chats/data/schema'

type NewChatProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onChatCreated?: (contacts: Contact) => void
}

export function NewChat({ open, onOpenChange, onChatCreated }: NewChatProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 400)
  const [selectedContacts, setSelectedContacts] = useState<Contact | null>(null)

  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts', debouncedSearch],
    queryFn: () => searchContacts(debouncedSearch),
  })

  const handleCreateChat = () => {
    if (!selectedContacts) return

    onChatCreated?.(selectedContacts)

    onOpenChange(false)
    setSelectedContacts(null)
    setSearchTerm('')
  }

  const setDisplaySearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleSelectUser = (contact: Contact) => {
    setSelectedContacts((prev) => (prev?.id === contact.id ? null : contact))
  }

  useEffect(() => {
    if (!open) {
      setSelectedContacts(null)
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
              onValueChange={setDisplaySearchTerm}
              value={searchTerm}
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

                    {selectedContacts?.id === contact.id && (
                      <Check className='h-4 w-4' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            variant={'default'}
            onClick={handleCreateChat}
            disabled={!selectedContacts}
          >
            Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
