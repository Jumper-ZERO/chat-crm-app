import { createFileRoute } from '@tanstack/react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export const Route = createFileRoute('/conversaciones')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
      >
        <AppSidebar></AppSidebar>
        </SidebarProvider>
  </div>
}
