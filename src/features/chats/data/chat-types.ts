// import { type conversations } from './convo.json'

export interface ChatMessage {
  sender: string,
  content: string,
  timestamp: Date
}

export type ChatUser = {
  id: number,
  fullName: string,
  phone: string,
  avatar: string,
  status: string,
  title: string,
  lastMessage: ChatMessage,
}

// export type Convo = ChatUser['messages'][number]
