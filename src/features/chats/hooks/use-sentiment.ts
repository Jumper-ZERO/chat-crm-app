import { useEffect } from "react";
import { useSocket } from "@/context/socket-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSentimentChat } from "@/features/dashboard/clients/sentiment.client";

interface GlobalSentiment {
  chatId?: string
  avgPos: number
  avgNeg: number
  avgNeu: number
  totalMessages: number
  dominant: 'POS' | 'NEG' | 'NEU'
}

export function useSentiment(chatId?: string) {
  const queryClient = useQueryClient();
  const { socket, isConnected } = useSocket();


  const { data: sentiment, isLoading: loading } = useQuery({
    queryKey: ['sentiment', 'chat', chatId],
    queryFn: () => getSentimentChat(chatId ?? ''),
    enabled: !!chatId,
  })

  // ! ALERT: This dependent for chatId connetion handler in whatsapp gateway
  useEffect(() => {
    if (!socket || !isConnected || !chatId) return;

    const handleUpdate = (data: GlobalSentiment) => {
      queryClient.setQueryData(['sentiment', 'chat', chatId], data)
    };

    socket.on("sentiment:update", handleUpdate);

    return () => {
      socket.off("sentiment:update", handleUpdate);
    };
  }, [socket, isConnected, chatId]);

  return {
    sentiment,
    loading,
    dominant: sentiment?.dominant ?? 'NEU',
    avgPos: sentiment?.avgPos ?? 0,
    avgNeg: sentiment?.avgNeg ?? 0,
    avgNeu: sentiment?.avgNeu ?? 0,
    totalMessages: sentiment?.totalMessages ?? 0,
  };
}
