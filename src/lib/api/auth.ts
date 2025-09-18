import axios from 'axios'

import { API_URL } from '@/lib/api/index'
import type { AuthUser } from '@/stores/auth-store';
import type { Login } from '@/types/auth.types';
import type { RouteContext } from '@/types/route.types';

export const auth = axios.create({
  baseURL: API_URL + '/auth',
  withCredentials: true
})

auth.interceptors.response.use((res) => res, (err) => {
  if (err?.response?.status === 401) {
    return Promise.reject(err);
  }
  return Promise.reject(err);
});

export async function login(payload: Login): Promise<AuthUser> {
  return auth.post<AuthUser>('/login', payload)
    .then((res) => res.data)
}

export function me() {
  const response = auth.get('/me');
  return response;
}

export async function session(): Promise<AuthUser> {
  const response = await auth.get<AuthUser>('/me');
  return response.data;
}

export async function getUser(context: RouteContext) {
  return context?.user ?? await me()
}