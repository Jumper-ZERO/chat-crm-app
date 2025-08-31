// Constants
export const WHATSAPP_API_VERSIONS = [
  "v18.0",
  "v19.0",
  "v20.0",
  "v21.0",
  "v22.0",
  "v23.0",
] as const;

export const DEFAULT_API_VERSION = WHATSAPP_API_VERSIONS[0];
export const PHONE_NUMBER_ID_LENGTH = 15;
export const BUSINESS_ID_LENGTH = 15;
export const MIN_TOKEN_LENGTH = 20;

export type ApiVersion = typeof WHATSAPP_API_VERSIONS[number];

export const isApiVersion = (v: unknown): v is ApiVersion =>
  typeof v === "string" && WHATSAPP_API_VERSIONS.includes(v as ApiVersion);

export interface WhatsAppConfigFormValues {
  businessId?: string;
  phoneNumberId?: string;
  webhookUrl?: string;
  accessToken?: string;
  verifyToken?: string;
  apiVersion?: typeof WHATSAPP_API_VERSIONS[number];
}

export interface WhatsAppConfig extends WhatsAppConfigFormValues {
  id?: string;
  apiBaseURL?: string;
  isActive?: boolean;
  businessName?: null;
  businessDescription?: null;
  webhookEvents?: null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TestConnectionResult = {
  success?: boolean;
  statusCode?: number;
  error?: string;
  message?: string;
}
