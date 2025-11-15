import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth-store"

export function useSignOut() {
  const reset = useAuthStore((s) => s.auth.reset)

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout")
    },
    onSuccess: () => {
      reset()
    },
  })
}
