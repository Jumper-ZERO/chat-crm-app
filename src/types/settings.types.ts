import type { LucideIcon } from 'lucide-react'

export interface SettingSidebarProps {
  activeItem: string | null
  onItemChange: (id: string) => void
}

export interface SettingItem {
  id: string
  name: string
  icon: LucideIcon
  component: React.ComponentType
  title: string
  description: string
}

export interface SettingGroup {
  id: string
  name: string
  items: SettingItem[]
}