import type { User } from "@/features/users/data/schema";
import { client } from "@/lib/http";

const users = client("/users");

export const getUsers = async (): Promise<User[]> => {
  const { data } = await users.get<User[]>("");
  return data;
};

export const searchUsers = async (search: string): Promise<User[]> => {
  const { data } = await users.get<User[]>("", { params: { search } });
  return data;
};
