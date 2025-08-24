import { configGroups } from './config'
import { ConfigNavGroup } from './settings-nav-group'

import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import type { SettingSidebarProps } from '@/types/settings.types'

export const SettingsSidebar = ({ activeItem, onItemChange }: SettingSidebarProps) => {
  return (
    <Sidebar collapsible="none" className="w-60 border-r">
      <SidebarContent>
        {configGroups.map((group) => (
          <ConfigNavGroup
            key={group.id}
            group={group}
            activeItem={activeItem}
            onItemChange={onItemChange}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
