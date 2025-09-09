export type CustomerStatus = "new" | "active" | "inactive" | "blocked"
export type SourceContact = "whatsapp" | "email" | "manual" | "imported"

export type Contact = {
  id?: string
  name: string
  phone: string
  customerStatus: CustomerStatus
  source: SourceContact
  createdAt: string
  updatedAt?: string
  assignedTo?: { username: string }
  deletedAt?: string | null
}
