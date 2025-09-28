import type { UserRoles } from '@/features/users/data/schema'
import { UserCheck, Users, Hammer, type LucideIcon } from 'lucide-react'

export const roles: Record<UserRoles, { label: string, value: string, icon: LucideIcon }> = {
  'admin': {
    label: 'Admin',
    value: 'admin',
    icon: UserCheck,
  },
  'manager': {
    label: 'Manager',
    value: 'manager',
    icon: Users,
  },
  'support': {
    label: 'Support',
    value: 'support',
    icon: Hammer,
  },
} as const
