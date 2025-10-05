import type { Chat, Message } from "@/features/chats/data/schema";
import { client } from "@/lib/http";

const chats = client('/chats')

export const getChatList = async () => {
  try {
    const response = await chats.get<Chat[]>('/list')

    return response?.data ?? []

  } catch (error) {
    console.error('Error al obtener la lista de chats:', error)
    return []
  }
}

export const createChat = async (agentId: string, contactId: string) => {
  const res = await chats.post<Chat>('', {
    title: 'new chat',
    contactId,
    agentId
  });

  return res?.data ?? []
}

export const getMessagesByChatId = async (chatId: string): Promise<Message[]> => {
  const response = await chats.get<Message[]>(`/${chatId}/messages`)
  return response?.data ?? []
}