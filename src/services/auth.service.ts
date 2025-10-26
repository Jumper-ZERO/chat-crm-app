import { client } from "@/lib/http";
import type { AuthUser, LoginForm } from "@/types";

const auth = client("/auth");

export const session = async (): Promise<AuthUser> => {
  const res = await auth.get<AuthUser>('/me');
  return res.data;
}

export async function login(payload: LoginForm): Promise<AuthUser> {
  return auth.post<AuthUser>('/login', payload)
    .then((res) => res.data)
}