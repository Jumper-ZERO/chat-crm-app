import { client } from "@/lib/http";
import type { Contact } from "@/models/contact.model";

type PaginatedResponse<T> = {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

const contacts = client("/contacts");

// export const getContacts = async (): Promise<Contact[]> => {
//   const { data } = await contacts.get<Contact[]>("/");
//   return data;
// }

export const getContacts = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Contact>> => {
  const { data } = await contacts.get<PaginatedResponse<Contact>>(
    `/?page=${page}&limit=${limit}`
  )
  return data
}