import { createFileRoute } from '@tanstack/react-router'
import { AppSidebar } from "@/components/app-sidebar"


import { ChatCard } from '@/routes/(dashboard)/-components/chat-card'
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export const Route = createFileRoute('/(dashboard)/chats')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    
    <div className='flex flex-col gap-6 p-6 md:p-10'>
      <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
      >
        <AppSidebar />
        <ChatCard contact={{
          fullName: "John Doe",
          phoneNumber: '51 123456789'
        }} />
      </SidebarProvider>
    </div>
  )
}
