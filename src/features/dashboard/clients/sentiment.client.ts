import { client } from "@/lib/http";

const sentiment = client("/sentiment")

type SentimentData = {
  chatId: string
  avgPos: number
  avgNeg: number
  avgNeu: number
  totalMessages: number
  dominant: 'POS' | 'NEG' | 'NEU'
}


export const getSentimentChat = (chatId: string) => sentiment.get<SentimentData>(`/chat/${chatId}`).then(res => {
  console.log(chatId)
  return res.data
})