import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Laptop, Moon, Sun } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { sidebarData } from './layout/data/sidebar-data'
import { ScrollArea } from './ui/scroll-area'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  const renderItems = (
    items: any[],
    parentTitle: string | null = null
  ): React.ReactNode => {
    return items.map((item, i) => {
      const fullTitle = parentTitle
        ? `${parentTitle} > ${item.title}`
        : item.title

      if (item.url) {
        return (
          <CommandItem
            key={`${item.url}-${i}`}
            value={fullTitle}
            onSelect={() => runCommand(() => navigate({ to: item.url }))}
          >
            <div className='flex size-4 items-center justify-center'>
              <ArrowRight className='text-muted-foreground/80 size-2' />
            </div>
            {fullTitle}
          </CommandItem>
        )
      }

      if (item.items) {
        return renderItems(item.items, item.title)
      }

      return null
    })
  }

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>

          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {renderItems(group.items)}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
