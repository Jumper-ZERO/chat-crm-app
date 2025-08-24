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
        icon: Settings,
        component: GeneralView
      },
      {
        id: 'users',
        name: 'Users & Permissions',
        icon: Users,
        component: UsersView
      },
      {
        id: 'theme',
        name: 'Appearance',
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
        icon: MessageCircle,
        component: WhatsappView
      },
    ]
  },
]

export const getConfigItemById = (id: string): SettingItem | undefined => {
  return configGroups
    .flatMap(group => group.items)
    .find(item => item.id === id)
}