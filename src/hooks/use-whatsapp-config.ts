import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getConfig, updateConfig } from "@/lib/api/whatsapp-config.api";
import { defaultValues, schema } from "@/schemas/whatsapp-config.schema";
import type { WhatsAppConfigFormValues } from "@/types/whatsapp.types";

export const useWhatsAppConfig = (businessId?: string) => {
  const queryClient = useQueryClient();
  const form = useForm<WhatsAppConfigFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const query = useQuery({
    queryKey: ["whatsapp", businessId],
    queryFn: () => getConfig(businessId!),
    enabled: Boolean(businessId),
  });

  useEffect(() => {
    if (query.error) {
      toast.error("Error al cargar la configuración");
      console.error(query.error); // * Debug
    }
  }, [query.error]);

  useEffect(() => {
    if (query.data) {
      form.reset(query.data);
    }
  }, [query.data, form]);

  const mutation = useMutation({
    mutationFn: (vals: WhatsAppConfigFormValues) =>
      updateConfig(businessId!, vals),
    onSuccess: () => {
      toast.success("Configuración guardada correctamente");
      queryClient.invalidateQueries({ queryKey: ["whatsapp", businessId] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Error al guardar la configuración");
      console.error(err); // * Debug
    },
  });

  const onSubmit = (vals: WhatsAppConfigFormValues) => {
    mutation.mutate(vals);
  };

  return {
    form,
    onSubmit,
    isLoading: query.isLoading,
    isSaving: mutation.isPending,
  };
};