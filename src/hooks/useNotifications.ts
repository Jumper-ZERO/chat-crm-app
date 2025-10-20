import { useQuery } from '@tanstack/react-query'
import { getNotifications } from '@/services/notification.service'

export function useNotifications() {

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  })

  return { notifications, isLoading }
}
