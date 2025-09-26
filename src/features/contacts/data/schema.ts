import { z } from "zod"

const statusSchema = z.union([
  z.literal("new"),       // contact created, no message yet
  z.literal("active"),    // first message sent
  z.literal("inactive"),  // message sent but no response
  z.literal("blocked"),   // customer stopped / unsubscribed / blocked
])
export type ContactStatus = z.infer<typeof statusSchema>

export const userSchema = z.object({
  id: z.uuid(),
  username: z.string().min(1, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  role: z.enum(["admin", "editor", "viewer"]).optional(), // si usas roles
  avatarUrl: z.url().nullable().optional(), // si hay imagen
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;

export const contactSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  phone: z.string(),
  status: statusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
  assignedTo: userSchema.nullable().optional(),
})

export type Contact = z.infer<typeof contactSchema>

export const contactListSchema = z.array(contactSchema)
