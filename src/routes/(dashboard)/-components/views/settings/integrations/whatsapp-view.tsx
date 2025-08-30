import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type FieldErrors, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getConfig, updateConfig } from "@/lib/api/whatsapp-config.api";
import { useUserStore } from "@/stores/userStore";
import type { WhatsAppConfigFormValues } from "@/types/whatsapp.types";

// Constants
const WHATSAPP_API_VERSIONS = [
  "v18.0",
  "v19.0",
  "v20.0",
  "v21.0",
  "v22.0",
  "v23.0",
] as const;

const DEFAULT_API_VERSION = "v18.0";
const PHONE_NUMBER_ID_LENGTH = 15;
const BUSINESS_ID_LENGTH = 15;
const MIN_TOKEN_LENGTH = 20;

// Schema
const whatsAppConfigSchema = z.object({
  phoneNumberId: z
    .string()
    .min(
      PHONE_NUMBER_ID_LENGTH,
      "Debes ingresar el ID del número de WhatsApp valido"
    )
    .default(""),
  businessId: z
    .string()
    .min(
      BUSINESS_ID_LENGTH,
      "Debes ingresar el ID de la cuenta de negocio valido"
    )
    .default(""),
  accessToken: z
    .string()
    .min(
      MIN_TOKEN_LENGTH,
      `El token debe tener al menos ${MIN_TOKEN_LENGTH} caracteres`
    )
    .default(""),
  verifyToken: z
    .string()
    .min(6, "El token debe tener al menos 6 caracteres")
    .default(""),
  apiVersion: z.string().default(DEFAULT_API_VERSION),
  webhookUrl: z.url("Debe ser una URL válida").optional().or(z.literal("")),
});

// Types
type WhatsAppConfigSchema = z.infer<typeof whatsAppConfigSchema>;

// Default form values
const getDefaultValues = (): WhatsAppConfigSchema => ({
  businessId: "",
  accessToken: "",
  phoneNumberId: "",
  webhookUrl: "",
  verifyToken: "",
  apiVersion: DEFAULT_API_VERSION,
});

// Custom hooks
const useWhatsAppConfig = (businessId?: string) => {
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<WhatsAppConfigFormValues>({
    resolver: zodResolver(whatsAppConfigSchema),
    defaultValues: getDefaultValues(),
  });

  const { reset } = form;

  useEffect(() => {
    if (!businessId) return;

    const loadConfig = async () => {
      try {
        const config = await getConfig(businessId);
        setIsLoadingConfig(true);

        if (config) {
          reset({
            phoneNumberId: config.phoneNumberId ?? "",
            businessId: config.businessId ?? "",
            accessToken: config.accessToken ?? "",
            verifyToken: config.verifyToken ?? "",
            apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
            webhookUrl: config.webhookUrl ?? "",
          });
        }
      } catch (error) {
        console.error("Error loading WhatsApp configuration:", error);
        toast.error("Error al cargar la configuración");
      } finally {
        setIsLoadingConfig(false);
      }
    };

    loadConfig();
  }, [businessId, reset]);

  const handleSubmit = async (values: WhatsAppConfigFormValues) => {
    setIsSaving(true);
    try {
      const updated = await updateConfig(values.businessId!, values);
      await new Promise((r) => setTimeout(r, 1000)); // simula carga

      toast.success("Configuración guardada correctamente 🎉");
      console.log("[updateConfig] Configuración actualizada:", updated);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Hubo un problema al guardar la configuración";

      console.error("[updateConfig] Error:", error);
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoadingConfig,
    isSaving,
  };
};

const onInvalidSubmit = (errors: FieldErrors<WhatsAppConfigFormValues>) => {
  Object.values(errors).forEach((error) => {
    if (error?.message) toast.error(error.message);
  });
};

// Component
export const WhatsappView = () => {
  const user = useUserStore((state) => state.user);
  const { form, handleSubmit, isSaving, isLoadingConfig } = useWhatsAppConfig(
    user?.businessId
  );

  return isLoadingConfig ? (
    <div className="flex justify-center items-center h-140">
      <Loader2Icon className="h-max w-6 animate-spin text-muted-foreground" />
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onInvalidSubmit)}
        className="space-y-6 flex flex-col justify-between h-8/10"
      >
        <div className="flex flex-col gap-5">
          {/* Business Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información de la cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputForm
                form={form}
                name="businessId"
                label="Business Account ID"
                placeholder="ID de la cuenta de negocio"
              />

              <InputForm
                form={form}
                name="phoneNumberId"
                label="Phone Number ID"
                placeholder="ID del número de Whatsapp"
              />

              <FormField
                control={form.control}
                name="apiVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versión de API</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || DEFAULT_API_VERSION}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar versión" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WHATSAPP_API_VERSIONS.map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tokens de acceso</h3>
            <div className="space-y-4">
              <InputForm
                form={form}
                name="accessToken"
                label="Access Token"
                placeholder="Token de acceso de Meta"
                secret={true}
              />

              <InputForm
                form={form}
                name="verifyToken"
                label="Verify Token"
                placeholder="Token de verificación de Meta"
                secret={true}
              />
            </div>
          </div>

          {/* Webhook Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuración de Webhook</h3>
            <InputForm
              form={form}
              name="webhookUrl"
              label="Webhook URL"
              placeholder="https://tu-dominio.com/whatsapp/webhook"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const InputForm = ({
  form,
  name,
  label,
  placeholder,
  secret = false,
  readOnly = false,
}: {
  form: UseFormReturn;
  name: keyof WhatsAppConfigSchema;
  label: string;
  placeholder: string;
  secret?: boolean;
  readOnly?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={secret ? "password" : "text"}
              placeholder={placeholder}
              readOnly={readOnly}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
