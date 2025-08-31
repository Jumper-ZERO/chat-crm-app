import type { AxiosError } from 'axios';

import { api } from '@/lib/api/index'
import type { TestConnectionResult, WhatsAppConfig, WhatsAppConfigFormValues } from '@/types/whatsapp.types';

const ENDPOINT = '/whatsapp/config';

const config = api(ENDPOINT);

export const getConfig = async (businessId: string): Promise<WhatsAppConfig> => {
  return config.get<WhatsAppConfig>(`/${businessId}`).then((res) => res.data);
}

export const updateConfig = async (businessId: string, body: WhatsAppConfigFormValues): Promise<WhatsAppConfig> => {
  return config.patch<WhatsAppConfig>(`/${businessId}`, body).then((res) => res.data);
}

export const testConnection = async (businessId: string): Promise<TestConnectionResult> => {
  return config.get<TestConnectionResult>(`/${businessId}/test-connection`)
    .then((res) => res.data)
    .catch((err: AxiosError) => err.response?.data ?? { success: false });
}