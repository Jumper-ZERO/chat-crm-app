import { z } from 'zod'

export const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('support'),
  z.literal('manager'),
  z.literal('agent')
])

export type UserRoles = z.infer<typeof userRoleSchema>

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  avatar: z.url(),
  email: z.string(),
  phone: z.string(),
  role: userRoleSchema,
  password: z.string().optional(),
  companyId: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
