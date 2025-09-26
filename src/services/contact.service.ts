import type { Contact } from "@/features/contacts/data/schema";
import type { DataTableQuery } from "@/hooks/use-data-table";
import { client } from "@/lib/http";
import type { Pagination } from "@/models/types";

const contacts = client("/contacts");

export const saveContact = async (data: object) => {
  return await contacts.post("", data);
}

export const getContactsDataTable = async (query: DataTableQuery<Contact>): Promise<Pagination<Contact>> => {
  const { data } = await contacts.post<Pagination<Contact>>("/table", query);

  return data;
};