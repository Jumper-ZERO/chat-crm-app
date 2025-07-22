import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Building2, Users, Headset, Notebook, Nfc } from 'lucide-react'

const items = [
  {
    title: "Conversaciones",
    url: "#",
    icon: Headset,
  },
  {
    title: "Conexiones",
    url: "#",
    icon: Nfc,
  },
  {
    title: "Contactos",
    url: "#",
    icon: Notebook,
  },
  {
    title: "Administración",
    url: "#",
    icon: Building2,
  },
  {
    title: "Usuarios",
    url: "#",
    icon: Users,
  },
]

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicacion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}