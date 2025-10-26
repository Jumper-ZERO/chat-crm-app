import { create } from 'zustand'
import type { AuthState } from '@/types'

export const useAuthStore = create<AuthState>()((set) => ({
  auth: {
    user: null,
    setUser: (user) =>
      set((state) => ({
        auth: { ...state.auth, user },
      })),
    accessToken: "",
    setAccessToken: (accessToken) =>
      set((state) => ({
        auth: { ...state.auth, accessToken },
      })),
    resetAccessToken: () =>
      set((state) => ({
        auth: { ...state.auth, accessToken: "" },
      })),
    reset: () =>
      set((state) => ({
        auth: { ...state.auth, user: null, accessToken: "" },
      })),
  },
}))
