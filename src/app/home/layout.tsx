import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSideBar } from '@/components/app-sidebar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className='w-full'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
