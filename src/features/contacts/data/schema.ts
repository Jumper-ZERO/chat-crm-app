import { z } from 'zod'

export const ContactStatusEnum = z.enum(['new', 'lead', 'prospect', 'client'])
export const ContactSourceEnum = z.enum(['whatsapp', 'manual'])

export const ContactSchema = z.object({
  id: z.uuid(),

  waId: z.string(),
  firstNames: z.string(),
  lastNames: z.string(),
  username: z.string(),
  name: z.string(),
  profile: z.string(),

  phoneNumber: z.string().min(1), // obligatorio

  email: z.email(),

  status: ContactStatusEnum.default('new'),
  source: ContactSourceEnum.default('manual'),

  lastInteractionAt: z.coerce.date(),
  tags: z.array(z.string()),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date(),

  company: z.any(), // puedes reemplazar con CompanySchema si lo tienes
  chats: z.array(z.any()).optional(),     // igual para ChatSchema
  messages: z.array(z.any()).optional(),  // igual para MessageSchema
})


export type Contact = z.infer<typeof ContactSchema>
export type ContactStatus = z.infer<typeof ContactStatusEnum>

export const contactListSchema = z.array(ContactSchema)
