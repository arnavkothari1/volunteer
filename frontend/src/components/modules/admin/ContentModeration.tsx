import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  Select,
  IconButton,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FiFlag, FiMoreVertical, FiEye } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface ReportedContent {
  id: string
  type: 'profile' | 'post' | 'comment'
  content: string
  reportedBy: string
  reason: string
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed'
  timestamp: string
}

export default function ContentModeration() {
  const [reports, setReports] = useState<ReportedContent[]>([])
  const [filter, setFilter] = useState('pending')
  const toast = useToast()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports'); // Adjust the API endpoint as needed
        const data = await response.json();
        setReports(data); // Set the fetched reports
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []); // Fetch reports on component mount

  const handleAction = async (reportId: string, action: string) => {
    try {
      // API call to handle moderation action
      toast({
        title: 'Action taken',
        description: `Report ${action} successfully`,
        status: 'success',
        duration: 3000,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to process action',
        status: 'error',
        duration: 3000,
      });
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow'
      case 'reviewed':
        return 'blue'
      case 'actioned':
        return 'red'
      case 'dismissed':
        return 'gray'
      default:
        return 'gray'
    }
  }

  return (
    <Stack spacing={6}>
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="bold">
          Content Moderation
        </Text>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          width="200px"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="actioned">Actioned</option>
          <option value="dismissed">Dismissed</option>
        </Select>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Content</Th>
            <Th>Reported By</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.map((report) => (
            <Tr key={report.id}>
              <Td>
                <Badge>{report.type}</Badge>
              </Td>
              <Td>
                <Text noOfLines={2}>{report.content}</Text>
              </Td>
              <Td>{report.reportedBy}</Td>
              <Td>{report.reason}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              </Td>
              <Td>{new Date(report.timestamp).toLocaleDateString()}</Td>
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
                      icon={<FiEye />}
                      onClick={() => handleAction(report.id, 'review')}
                    >
                      Review
                    </MenuItem>
                    <MenuItem
                      icon={<FiFlag />}
                      onClick={() => handleAction(report.id, 'action')}
                      color="red.500"
                    >
                      Take Action
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleAction(report.id, 'dismiss')}
                    >
                      Dismiss
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