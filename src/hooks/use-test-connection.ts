import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { testConnection } from "@/lib/api/whatsapp-config.api";


export const useTestConnection = () => {
  return useMutation({
    mutationFn: (businessId: string) => testConnection(businessId),
    onError: (err: unknown) => {
      toast.error("Error al testear la API");
      console.error("[test-connection]", err);
    },
    onSuccess: (data) => {
      if (data.success) toast.success("Conexión exitosa");
      else toast.error("Falló la prueba de conexión")
    }
  })
};