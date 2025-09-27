import { userSchema } from "@/features/users/data/schema"
import { z } from "zod"

const statusSchema = z.union([
  z.literal("new"),       // contact created, no message yet
  z.literal("active"),    // first message sent
  z.literal("inactive"),  // message sent but no response
  z.literal("blocked"),   // customer stopped / unsubscribed / blocked
])
export type ContactStatus = z.infer<typeof statusSchema>

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
