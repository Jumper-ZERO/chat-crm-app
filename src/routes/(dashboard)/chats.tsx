import { createFileRoute } from '@tanstack/react-router'
import { AppSidebar } from "@/components/app-sidebar"


import { ChatCard } from '@/routes/(dashboard)/-components/chat-card'
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

export const Route = createFileRoute('/(dashboard)/chats')({
  component: RouteComponent,
}

function RouteComponent() {

  return (
    <ChatCard contact={{
      fullName: "John Doe",
      phoneNumber: '51922936950'
    }} />
  )
}
