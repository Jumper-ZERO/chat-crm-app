import type { Contact } from "@/features/contacts/data/schema";
import { client } from "@/lib/http";
import type { Pagination } from "@/models/types";

const contacts = client("/contacts");

export const getContacts = async (params: unknown): Promise<Pagination<Contact>> => {
  const { data } = await contacts.get<Pagination<Contact>>("", { params });
  return data;
};

export const saveContact = async (data: object) => {
  return await contacts.post("", data);
}