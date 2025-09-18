import { create } from 'zustand'

export interface AuthUser {
  sub: string
  username: string
  role: string
  businessId: string
  companyId: string
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

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
