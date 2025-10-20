import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSocket } from '@/context/socket-provider'
import { getNotifications } from '@/services/notification.service'

type OutgoingMessagePayload = {
  type: 'message'
  id: string
  chatId: string
  contact: {
    username: string
  }
  message: {
    body: string
  }
  time: string
}

export function useNotifications() {
  const queryClient = useQueryClient()
  const { socket } = useSocket()

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  })

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notif: any) => {
      const notification = {
        id: notif?.id,
        title: `Nuevo mensaje de ${notif?.contact?.username}`,
        message: notif?.message?.body,
        time: notif?.time,
      }
      queryClient.setQueryData(['notifications'], (prev: any = []) => [notification, ...prev])
    }

    socket.on('new-notification', handleNewNotification)

    return () => {
      socket.off('new-notification', handleNewNotification)
    }
  }, [socket, queryClient])

  return { notifications, isLoading }
}
