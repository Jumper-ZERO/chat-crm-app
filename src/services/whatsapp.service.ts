import { client } from "@/lib/http";
import { schema as WhatsappConfigSchema, type WhatsAppConfigInput } from "@/schemas/whatsapp-config.schema";

const ws = client("/whatsapp");

export const getConfig = async (businessID: string) => {
  const { data } = await ws.get(`/config/${businessID}`);
  const result = WhatsappConfigSchema.loose().safeParse(data);

  if (!result.success)
    throw new Error("Datos inválidos del backend");

  return result.data;
};

export const saveConfig = async (businessId: string, body: WhatsAppConfigInput) => {
  const { data } = await ws.patch<WhatsAppConfigInput>(`config/${businessId}`, body);
  const result = WhatsappConfigSchema.safeParse(data);

  if (!result.success)
    throw new Error("Datos inválidos del backend");

  return result.data
}