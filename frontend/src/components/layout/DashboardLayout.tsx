import {
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
  useColorModeValue,
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import DashboardNavbar from './DashboardNavbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box minH="100vh" bg={bgColor}>
      <Sidebar
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <DashboardNavbar onOpen={onOpen} />
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
