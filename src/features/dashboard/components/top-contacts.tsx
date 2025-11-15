import { useQuery } from '@tanstack/react-query'
import { formatPhone } from '@/lib/phone'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getTopContacts } from '@/features/dashboard/clients/metrics.client'

export function TopContacts() {
  const { data: contacts = [] } = useQuery({
    queryKey: ['metrics', 'contacts'],
    queryFn: () => getTopContacts,
  })

  return (
    <div className='space-y-8'>
      {contacts.map(
        ({
          id,
          username,
          firstNames,
          lastNames,
          profile,
          phoneNumber,
          messageCount,
        }) => (
          <div key={id} className='flex items-center gap-4'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={profile ?? undefined} alt={firstNames} />
              <AvatarFallback>
                {firstNames ? firstNames[0] : username[0]}
                {firstNames && lastNames?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-1 flex-wrap items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {firstNames && lastNames
                    ? `${firstNames} ${lastNames}`
                    : username}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {formatPhone(phoneNumber) ?? 'Sin Informacion de contacto'}
                </p>
              </div>
              <div className='font-medium'>{messageCount} mensajes</div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
