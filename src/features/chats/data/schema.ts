import z from "zod";

export const message = z.object({
  id: z.uuid().optional(),
  waMessageId: z.string().optional(),
  body: z.string().min(1, "El mensaje no puede estar vacío"),
  mediaUrl: z.url().optional(),
  direction: z.enum(['in', 'out']).default('in'),
  type: z.enum(["text", "image", "audio", "video", "document"]).default("text"),
  status: z.enum(["sent", "delivered", "read"]).default("sent"),
  createdAt: z.iso.datetime(),
})

export const contact = z.object({
  id: z.uuid(),
  waId: z.string().optional(), // WhatsApp ID
  username: z.string().optional(),
  profile: z.url().optional(),
  phoneNumber: z.string(),
  email: z.string().optional(),
  status: z.enum(['new', 'lead', 'prospect', 'client']).default('new'),
  source: z.enum(['whatsapp', 'manual']).default('whatsapp'),
  tags: z.array(z.string())
})

export const chat = z.object({
  id: z.uuid(),
  status: z.enum(['open', 'pending', 'closed', 'archived']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  lastMessage: message,
  contact: contact,
  createdAt: z.iso.datetime(),
})

export type Message = z.infer<typeof message>;
export type Contact = z.infer<typeof contact>;
export type Chat = z.infer<typeof chat>;