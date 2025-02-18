import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { useToast } from '@chakra-ui/react'

interface NotificationPayload {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  createdAt: string
}

export function useRealTimeNotifications() {
  const [socket, setSocket] = useState<typeof Socket | null>(null)
  const [notifications, setNotifications] = useState<NotificationPayload[]>([])
  const toast = useToast()

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL || '', {
      auth: {
        token: localStorage.getItem('token'),
      },
    })

    socketInstance.on('connect', () => {
      console.log('Connected to notification server')
    })

    socketInstance.on('notification', (notification: NotificationPayload) => {
      setNotifications((prev) => [notification, ...prev])
      
      // Show toast for new notifications
      toast({
        title: notification.title,
        description: notification.message,
        status: notification.type,
        duration: 5000,
        isClosable: true,
      })
    })

    socketInstance.on('error', (error: unknown) => {
      console.error('Socket error:', error)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [toast])

  const sendNotificationRead = (notificationId: string) => {
    if (socket) {
      socket.emit('notification:read', { notificationId })
    }
  }

  return {
    notifications,
    sendNotificationRead,
  }
} 