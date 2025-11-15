import type { LucideIcon } from "lucide-react"

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export const NavIntegrations = ({ intgs }: {
  intgs: {
    name: string,
    url: string,
    icon: LucideIcon
  }[]
}) => {
  // const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Integrations</SidebarGroupLabel>
      <SidebarMenu>
        {intgs.map((item) => ( 
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
         ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
