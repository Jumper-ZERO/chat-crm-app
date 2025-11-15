import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { SettingGroup } from "@/types/settings.types"

interface SettingsNavGroupProps {
  group: SettingGroup
  activeItem: string | null
  onItemChange: (id: string) => void
}

export function ConfigNavGroup({ 
  group, 
  activeItem, 
  onItemChange 
}: SettingsNavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
      <SidebarMenu>
        {group.items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton 
              onClick={() => onItemChange(item.id)}
              isActive={activeItem === item.id}
            >
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}