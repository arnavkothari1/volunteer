import {
  Box,
  Stack,
  Text,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useColorModeValue,
  HStack,
  Divider,
} from '@chakra-ui/react'
import { FiBell, FiCheck, FiTrash2, FiSettings } from 'react-icons/fi'
import { useState } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => Promise<void>
  onMarkAllAsRead: () => Promise<void>
  onDelete: (id: string) => Promise<void>
  onSettingsClick: () => void
}

export default function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onSettingsClick,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'green'
      case 'warning':
        return 'orange'
      case 'error':
        return 'red'
      default:
        return 'blue'
    }
  }

  return (
    <Box position="relative">
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton
          as={IconButton}
          icon={
            <>
              <FiBell />
              {unreadCount > 0 && (
                <Badge
                  colorScheme="red"
                  position="absolute"
                  top="-1"
                  right="-1"
                  borderRadius="full"
                  minW="1.5em"
                >
                  {unreadCount}
                </Badge>
              )}
            </>
          }
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        />
        <MenuList
          maxH="400px"
          overflowY="auto"
          minW="320px"
          p={0}
          bg={bgColor}
          borderColor={borderColor}
        >
          <Box p={4}>
            <HStack justify="space-between">
              <Text fontWeight="bold">Notifications</Text>
              <HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<FiCheck />}
                  onClick={onMarkAllAsRead}
                >
                  Mark all as read
                </Button>
                <IconButton
                  aria-label="Notification settings"
                  icon={<FiSettings />}
                  size="sm"
                  variant="ghost"
                  onClick={onSettingsClick}
                />
              </HStack>
            </HStack>
          </Box>
          <Divider />
          <Stack spacing={0}>
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                p={4}
                bg={notification.read ? 'transparent' : 'gray.50'}
                _hover={{ bg: 'gray.100' }}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <HStack justify="space-between" mb={2}>
                  <Badge colorScheme={getNotificationColor(notification.type)}>
                    {notification.type}
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>
                <Text fontWeight="medium">{notification.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {notification.message}
                </Text>
                <HStack mt={2} justify="flex-end" spacing={2}>
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FiCheck />}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                  <IconButton
                    aria-label="Delete notification"
                    icon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDelete(notification.id)}
                  />
                </HStack>
              </Box>
            ))}
          </Stack>
        </MenuList>
      </Menu>
    </Box>
  )
} 