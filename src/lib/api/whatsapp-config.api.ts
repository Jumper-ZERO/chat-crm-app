import axios from 'axios';

import { API_URL } from '@/lib/api/config'
import type { WhatsAppConfig, WhatsAppConfigFormValues } from '@/types/whatsapp.types';

const config = axios.create({
  baseURL: API_URL + '/whatsapp/config',
  withCredentials: true
})

export const getConfig = async (businessId: string): Promise<WhatsAppConfig> => {
  return await config.get<WhatsAppConfig>(`/${businessId}`).then((res) => res.data);
}

export const updateConfig = async (businessId: string, body: WhatsAppConfigFormValues): Promise<WhatsAppConfig> => {
  return config.patch<WhatsAppConfig>(`/${businessId}`, body).then((res) => res.data);
}