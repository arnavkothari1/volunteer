import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Stack,
  HStack,
  Select,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useToast,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FiMoreVertical, FiSearch, FiRefreshCw } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
  status: string
  lastActive: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const toast = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users') // Adjust the API endpoint as needed
        const data = await response.json()
        setUsers(data) // Set the fetched users
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, []) // Fetch users on component mount

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      // Example API call to update user status
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast({
          title: 'Status updated',
          status: 'success',
          duration: 3000,
        })
        // Optionally refresh users or update state here
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Example API call to update user role
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast({
          title: 'Role updated',
          status: 'success',
          duration: 3000,
        })
        // Optionally refresh users or update state here
      }
    } catch (error) {
      console.error('Error updating role:', error)
    }
  }

  return (
    <Stack spacing={6}>
      <HStack>
        <InputGroup>
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          width="200px"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </Select>
        <IconButton
          aria-label="Refresh"
          icon={<FiRefreshCw />}
          onClick={() => {/* Refresh users */}}
        />
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Last Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge
                  colorScheme={
                    user.role === 'admin'
                      ? 'red'
                      : user.role === 'moderator'
                      ? 'purple'
                      : 'green'
                  }
                >
                  {user.role}
                </Badge>
              </Td>
              <Td>
                <Badge
                  colorScheme={
                    user.status === 'active'
                      ? 'green'
                      : user.status === 'suspended'
                      ? 'red'
                      : 'gray'
                  }
                >
                  {user.status}
                </Badge>
              </Td>
              <Td>{new Date(user.lastActive).toLocaleDateString()}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        handleStatusChange(
                          user.id,
                          user.status === 'active' ? 'suspended' : 'active'
                        )
                      }
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role === 'user' ? 'moderator' : 'user'
                        )
                      }
                    >
                      Change Role
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
} 
