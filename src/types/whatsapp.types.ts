export interface WhatsAppConfigFormValues {
  businessId?: string;
  phoneNumberId?: string;
  webhookUrl?: string;
  accessToken?: string;
  verifyToken?: string;
  apiVersion?: string;
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
