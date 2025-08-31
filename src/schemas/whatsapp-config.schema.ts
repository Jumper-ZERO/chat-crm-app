import { z } from "zod";

import {
  BUSINESS_ID_LENGTH,
  MIN_TOKEN_LENGTH,
  PHONE_NUMBER_ID_LENGTH,
  WHATSAPP_API_VERSIONS
} from "@/types/whatsapp.types";

// Schema
export const schema = z.object({
  phoneNumberId: z
    .string()
    .min(PHONE_NUMBER_ID_LENGTH, "Debes ingresar el ID del número de WhatsApp valido")
    .default(""),
  businessId: z
    .string()
    .min(BUSINESS_ID_LENGTH, "Debes ingresar el ID de la cuenta de negocio valido")
    .default(""),
  accessToken: z
    .string()
    .min(MIN_TOKEN_LENGTH, `El token debe tener al menos ${MIN_TOKEN_LENGTH} caracteres`)
    .default(""),
  verifyToken: z
    .string()
    .min(6, "El token debe tener al menos 6 caracteres")
    .default(""),
  apiVersion: z.enum(WHATSAPP_API_VERSIONS).default("v18.0"),
  webhookUrl: z.url("Debe ser una URL válida").optional().or(z.literal("")),
});

// Types
export type WhatsAppConfigSchema = z.infer<typeof schema>;

// Default form values
export const defaultValues: WhatsAppConfigSchema = {
  businessId: "",
  accessToken: "",
  phoneNumberId: "",
  webhookUrl: "",
  verifyToken: "",
  apiVersion: "v18.0",
};