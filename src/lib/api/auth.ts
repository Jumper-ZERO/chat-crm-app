import axios from 'axios'

import { API_URL } from '@/lib/api/index'
import type { AuthUser, LoginPayload } from '@/types/auth.types';
import type { RouteContext } from '@/types/route.types';

export const auth = axios.create({
  baseURL: API_URL + '/auth',
  withCredentials: true
})

auth.interceptors.response.use((res) => res, (err) => {
  if (err?.response?.status === 401) {
    console.warn('Sesión expirada');
    return Promise.resolve({ data: null });
  }
  return Promise.reject(err);
})

export async function login(payload: LoginPayload): Promise<boolean> {
  return auth.post('/login', payload)
    .then((res) => res?.status === 201)
}

export async function me(): Promise<AuthUser | null> {
  return await auth.get<AuthUser>('/me').then((res) => res.data);
}

export async function getUser(context: RouteContext) {
  return context?.user ?? await me()
}