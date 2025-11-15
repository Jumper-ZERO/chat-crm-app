import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ContactFormValues } from "@/schemas/contact.schema";
import { saveContact } from "@/services/contact.service";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await saveContact(data);
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error: unknown) => {
      console.error("Error al crear contacto:", error);
    },
  });
}