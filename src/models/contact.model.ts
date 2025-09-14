import type { QueryParams } from "@/models/types";

export const customerStatusValues = ["new", "active", "inactive", "blocked"] as const;
export type CustomerStatus = typeof customerStatusValues[number];

export const sourceContactValues = ["whatsapp", "email", "manual", "imported"] as const;
export type SourceContact = typeof sourceContactValues[number];

export interface ContactQuery extends QueryParams {
  status?: string;
  source?: string;
  name?: string;
  phone?: string;
  customStatus?: string;
}

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
