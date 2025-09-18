import { useState, type JSX } from 'react'
import { useLocation, useNavigate, Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

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
          <SelectTrigger className='h-12 sm:w-48'>
            <SelectValue placeholder='Select section' />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <div key={item.href}>
                <SelectItem value={item.href}>
                  <div className='flex gap-x-4 px-2 py-1'>
                    <span className='scale-125'>{item.icon}</span>
                    <span className='text-md'>{item.title}</span>
                  </div>
                </SelectItem>
                {item.children?.map((child) => (
                  <SelectItem key={child.href} value={child.href}>
                    <div className='flex gap-x-4 pl-8 py-1'>
                      <span className='scale-110'>{child.icon}</span>
                      <span className='text-sm'>{child.title}</span>
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
            <div key={item.href} className='w-full'>
              {/* Item principal */}
              <Link
                to={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  pathname === item.href
                    ? 'bg-muted hover:bg-accent'
                    : 'hover:bg-accent hover:underline',
                  'justify-start w-full'
                )}
              >
                <span className='me-2'>{item.icon}</span>
                {item.title}
              </Link>

              {/* Subitems (si existen) */}
              {item.children && (
                <div className='ml-6 mt-1 flex flex-col space-y-1'>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === child.href
                          ? 'bg-muted hover:bg-accent'
                          : 'hover:bg-accent hover:underline',
                        'justify-start text-sm'
                      )}
                    >
                      <span className='me-2'>{child.icon}</span>
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </>
  )
}
