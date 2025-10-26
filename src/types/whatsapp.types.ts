export type WHATSAPP_API_VERSIONS = "v18.0" | "v19.0" | "v20.0" | "v21.0" | "v22.0" | "v23.0";

export const DEFAULT_API_VERSION = "v22.0";
export const PHONE_NUMBER_ID_LENGTH = 15;
export const BUSINESS_ID_LENGTH = 15;
export const MIN_TOKEN_LENGTH = 20;

export interface WhatsAppConfigFormValues {
  businessId?: string;
  phoneNumberId?: string;
  webhookUrl?: string;
  accessToken?: string;
  verifyToken?: string;
  apiVersion?: WHATSAPP_API_VERSIONS;
}

export type TestConnectionResult = {
  success?: boolean;
  statusCode?: number;
  error?: string;
  message?: string;
}

export type WhatsAppConfig = {
  apiVersion?: WHATSAPP_API_VERSIONS;
  apiBaseURL?: string;
  businessID?: string;
  accessToken?: string;
  phoneNumberID?: string;
  webhookURL?: string;
  webhookVerifyToken?: string;
  isActive?: boolean;
}