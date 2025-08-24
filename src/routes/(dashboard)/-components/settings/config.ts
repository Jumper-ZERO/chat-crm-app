import { MessageCircle, Settings, Users, Palette } from 'lucide-react'

import { GeneralView, UsersView, ThemeView } from '../views/settings'
import { WhatsappView } from '../views/settings/integrations/whatsapp-view'

import type { SettingGroup, SettingItem } from '@/types/settings.types'


export const configGroups: SettingGroup[] = [
  {
    id: 'settings',
    name: 'Settings',
    items: [
      {
        id: 'general',
        name: 'General',
        title: 'General',
        description: 'description general',
        icon: Settings,
        component: GeneralView
      },
      {
        id: 'users',
        name: 'Users & Permissions',
        title: 'General',
        description: 'description general',
        icon: Users,
        component: UsersView
      },
      {
        id: 'theme',
        name: 'Appearance',
        title: 'General',
        description: 'description general',
        icon: Palette,
        component: ThemeView
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations',
    items: [
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        title: 'General',
        description: 'description general',
        icon: MessageCircle,
        component: WhatsappView
      },
    ]
  },
]

const CONFIG_MAP: Map<string, SettingItem> = new Map(
  configGroups.flatMap((g) => (g.items ?? []).map((it) => [it.id, it] as const))
);

export const getConfigItemById = (id: string): SettingItem | undefined => {
  return CONFIG_MAP.get(id);
};