import { AxiosError } from "axios";

import { client } from "@/lib/http";
import type { Contact } from "@/models/contact.model";
import type { Pagination } from "@/models/types";

const contacts = client("/contacts");

export const getContacts = async (params: unknown): Promise<Pagination<Contact>> => {
  const { data } = await contacts.get<Pagination<Contact>>("", { params });
  return data;
};

export const saveContact = async (data: object) => {
  try {
    return await contacts.post("", data);
  } catch (e: unknown) {
    const err = e as AxiosError;
    console.log(err);
  }
}