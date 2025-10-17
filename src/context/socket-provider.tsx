import { createContext, useContext, useEffect, useState } from 'react'
import { sendTemplate } from '@/services/whatsapp.service'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: React.ReactNode
}

const handleError = (err: any) => {
  console.log(err)
  if (err?.hasAction) {
    toast.error(err.type, {
      position: 'top-right',
      description: err.message,
      action: {
        label: 'Enviar',
        onClick: () => sendTemplate(err.to),
      },
      closeButton: true,
      duration: Infinity,
    })
  } else {
    toast.error(err.type, {
      position: 'top-right',
      description: err.message,
    })
  }
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user, accessToken: token } = useAuthStore((state) => state.auth)

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    const newSocket = io(
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000/whatsapp',
      {
        auth: {
          user,
        },
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      }
    )

    // Event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id)
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    newSocket.on('connect-error', (error) => {
      console.error('Socket connection error:', error)
      setIsConnected(false)
    })

    newSocket.on('error-event', handleError)

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [user, token])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
