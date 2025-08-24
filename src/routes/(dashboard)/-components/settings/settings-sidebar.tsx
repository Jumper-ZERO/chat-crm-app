// settings-sidebar.tsx
import { configGroups } from "./config";
import { ConfigNavGroup } from "./settings-nav-group";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import type { SettingSidebarProps } from "@/types/settings.types";

export const SettingsSidebar = ({ activeItem, onItemChange }: SettingSidebarProps) => {
  return (
    // forzamos p-0 para evitar wrappers internos con px-5
    <Sidebar collapsible="none" className="">
      {/* SidebarContent p-0 para quitar padding adicional */}
      <SidebarContent className="">
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
  );
};
