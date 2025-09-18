import { z } from "zod";

export const versions = ["v18.0", "v19.0", "v20.0", "v21.0", "v22.0", "v23.0"] as const;
export const defaultVersion = versions[4];
const businessIdLength = 15;
const phoneNumberIdLength = 15;
const tokenLength = 15;

// Schema
export const schema = z.object({
  businessId: z.string().min(businessIdLength).default(""),
  phoneNumberId: z.string().min(phoneNumberIdLength).or(z.literal("")).optional(),
  apiVersion: z.enum(versions).default(defaultVersion),
  accessToken: z.string().min(tokenLength).or(z.literal("")).optional(),
  webhookVerifyToken: z.string().min(6).or(z.literal("")).optional(),
  webhookUrl: z.url().optional().or(z.literal("")),
});

// Types
export type WhatsAppConfig = z.infer<typeof schema>;
export type WhatsAppConfigInput = Partial<WhatsAppConfig>;

// Default form values
export const defaultValues: WhatsAppConfig = {
  businessId: "",
  accessToken: "",
  phoneNumberId: "",
  webhookUrl: "",
  webhookVerifyToken: "",
  apiVersion: "v18.0",
};