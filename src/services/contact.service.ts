import { AxiosError } from "axios";

import { client } from "@/lib/http";
import type { Contact } from "@/models/contact.model";
import type { ContactQuery } from "@/models/contact.query";

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

export const getContacts = async (
  params: ContactQuery
): Promise<PaginatedResponse<Contact>> => {
  const { data } = await contacts.get<PaginatedResponse<Contact>>("", { params });
  return data;
};

export const saveContact = async (data: object) => {
  try {
    return await contacts.post("/", data);
  } catch (e: unknown) {
    const err = e as AxiosError;
    console.log(err);
  }
}