// export type CustomerStatus = "new" | "active" | "inactive" | "blocked"
// export type SourceContact = "whatsapp" | "email" | "manual" | "imported"
export const customerStatusValues = ["new", "active", "inactive", "blocked"] as const;
export type CustomerStatus = typeof customerStatusValues[number];

export const sourceContactValues = ["whatsapp", "email", "manual", "imported"] as const;
export type SourceContact = typeof sourceContactValues[number];

export type Contact = {
  id: string
  name: string
  phone: string
  customerStatus: CustomerStatus
  source: SourceContact
  createdAt: string
  updatedAt?: string
  assignedTo?: { username: string }
  deletedAt?: string | null
}
