import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Contacts } from '@/features/contacts'

export const SortQueryParamSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

export const QueryParamsSchema = z.object({
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).optional(),
  sort: z.array(SortQueryParamSchema).optional(),
})

export const contactsSearchSchema = QueryParamsSchema

export type ContactSchema = z.infer<typeof contactsSearchSchema>
export type ContactsSchemaPartial = Partial<ContactSchema>

export const Route = createFileRoute('/_authenticated/contacts/')({
  validateSearch: contactsSearchSchema,
  component: Contacts,
})
