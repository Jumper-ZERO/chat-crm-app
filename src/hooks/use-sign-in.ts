import { useMutation } from "@tanstack/react-query"
import { login } from "@/services/auth.service"

export function useSignIn() {
  return useMutation({
    mutationFn: login
  })
}
