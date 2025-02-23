import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  BoxProps,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'

interface NavItemProps extends BoxProps {
  icon: IconType
  children: string
  path: string
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const NavItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Opportunities', icon: FiCompass, path: '/opportunities' },
  { name: 'Applications', icon: FiTrendingUp, path: '/applications' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
  { name: 'Saved', icon: FiStar, path: '/saved' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  const router = useRouter()
  const isActive = router.pathname === path
  const activeBg = useColorModeValue('blue.50', 'blue.900')
  const activeColor = useColorModeValue('blue.600', 'blue.200')
  const inactiveBg = useColorModeValue('transparent', 'transparent')

  return (
    <Link href={path} passHref>
      <Box
        as="a"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? activeBg : inactiveBg}
          color={isActive ? activeColor : undefined}
          _hover={{
            bg: activeBg,
            color: activeColor,
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  )
}

export default function Sidebar({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          StudentVolunteer
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {NavItems.map((nav) => (
        <NavItem key={nav.name} icon={nav.icon} path={nav.path}>
          {nav.name}
        </NavItem>
      ))}
    </Box>
  )
}
