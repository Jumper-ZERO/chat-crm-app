import { useState, type JSX } from 'react'
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { useLocation, useNavigate, Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SidebarItem = {
  href: string
  title: string
  icon: JSX.Element
  children?: SidebarItem[]
}

type SidebarNavProps = React.HTMLAttributes<HTMLElement> & {
  items: SidebarItem[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [val, setVal] = useState(pathname ?? '/settings')

  const handleSelect = (e: string) => {
    setVal(e)
    navigate({ to: e })
  }

  return (
    <>
      {/* Mobile Select */}
      <div className='p-1 md:hidden'>
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className='h-12 sm:w-fit'>
            <SelectValue placeholder='Select section' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <div key={item.href}>
                <SelectItem value={item.href} hidden={Boolean(item?.children)}>
                  <div className='flex gap-x-4 px-2 py-1'>
                    <span className='scale-125'>{item.icon}</span>
                    <span className='text-md'>{item.title}</span>
                  </div>
                </SelectItem>
                {item.children?.map((child) => (
                  <SelectItem key={child.href} value={child.href}>
                    <div className='flex gap-x-4 px-2 py-1'>
                      <span className='scale-110'>{child.icon}</span>
                      <span className='text-sm'>
                        {item.title + ' - ' + child.title}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Sidebar */}
      <ScrollArea
        orientation='horizontal'
        type='always'
        className='bg-background hidden w-full min-w-40 px-1 py-2 md:block'
      >
        <nav
          className={cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <div key={item.title} className='relative w-full'>
              {item.children ? (
                <Collapsible className='ml-1'>
                  <CollapsibleTrigger
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'text-muted-foreground hover:bg-accent hover:text-foreground relative w-full justify-between'
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='me-2'>{item.icon}</span>
                      {item.title}
                    </div>
                    <ChevronDown className='size-4 opacity-60 transition-transform data-[state=open]:rotate-180' />
                  </CollapsibleTrigger>

                  <CollapsibleContent className='mt-1 ml-6 flex flex-col space-y-1'>
                    {item.children.map((child) => (
                      <div key={child.href} className='relative'>
                        <Link
                          to={child.href}
                          className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            pathname === child.href
                              ? 'hover:bg-accent text-foreground'
                              : 'hover:bg-accent text-muted-foreground hover:underline',
                            'w-full justify-start text-sm'
                          )}
                        >
                          <span className='me-2'>{child.icon}</span>
                          {child.title}
                        </Link>

                        {pathname === child.href && (
                          <div className='bg-primary absolute top-0 left-0 h-full w-0.5' />
                        )}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className='relative'>
                  <Link
                    to={item.href!}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      pathname === item.href
                        ? 'hover:bg-accent text-foreground'
                        : 'hover:bg-accent text-muted-foreground hover:underline',
                      'w-full justify-start'
                    )}
                  >
                    <span className='me-2'>{item.icon}</span>
                    {item.title}
                  </Link>

                  {/* Indicador de barra lateral izquierda para elementos sin hijos */}
                  {pathname === item.href && (
                    <div className='bg-primary absolute top-0 left-0 h-full w-0.5' />
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </>
  )
}
