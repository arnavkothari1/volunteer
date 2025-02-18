import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Text,
  Select,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface EmailPreference {
  type: string
  description: string
  enabled: boolean
  frequency: 'immediate' | 'daily' | 'weekly' | 'never'
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  lastModified: string
  status: 'active' | 'draft' | 'archived'
}

export default function EmailNotifications() {
  const [preferences, setPreferences] = useState<EmailPreference[]>([
    {
      type: 'application_updates',
      description: 'Updates about your job applications',
      enabled: true,
      frequency: 'immediate',
    },
    {
      type: 'new_opportunities',
      description: 'New job opportunities matching your preferences',
      enabled: true,
      frequency: 'daily',
    },
    {
      type: 'profile_views',
      description: 'When someone views your profile',
      enabled: true,
      frequency: 'weekly',
    },
    {
      type: 'messages',
      description: 'New messages from recruiters or hiring managers',
      enabled: true,
      frequency: 'immediate',
    },
  ])

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Application Confirmation',
      subject: 'Your application has been received',
      lastModified: '2024-03-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Interview Invitation',
      subject: "You've been invited for an interview",
      lastModified: '2024-03-14',
      status: 'active',
    },
    {
      id: '3',
      name: 'Profile View Notification',
      subject: 'Someone viewed your profile',
      lastModified: '2024-03-13',
      status: 'draft',
    },
  ])

  const toast = useToast()

  const handlePreferenceChange = async (index: number, field: 'enabled' | 'frequency', value: boolean | string) => {
    try {
      const newPreferences = [...preferences]
      newPreferences[index] = {
        ...newPreferences[index],
        [field]: value,
      }
      setPreferences(newPreferences)

      // API call to update preferences
      await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreferences),
      })

      toast({
        title: 'Preferences updated',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.error('Error updating preferences:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'draft':
        return 'yellow'
      case 'archived':
        return 'gray'
      default:
        return 'gray'
    }
  }

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/notifications/templates'); // Adjust the API endpoint as needed
        const data = await response.json();
        setTemplates(data); // Set the fetched templates
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []); // Fetch templates on component mount

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="md" mb={6}>
          Email Preferences
        </Heading>
        <Stack spacing={4}>
          {preferences.map((pref, index) => (
            <Box
              key={pref.type}
              p={4}
              borderWidth="1px"
              borderRadius="md"
            >
              <Stack spacing={4}>
                <HStack justify="space-between">
                  <Box>
                    <Text fontWeight="medium">{pref.type.replace(/_/g, ' ')}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {pref.description}
                    </Text>
                  </Box>
                  <Switch
                    isChecked={pref.enabled}
                    onChange={(e) =>
                      handlePreferenceChange(index, 'enabled', e.target.checked)
                    }
                  />
                </HStack>
                {pref.enabled && (
                  <FormControl>
                    <FormLabel fontSize="sm">Frequency</FormLabel>
                    <Select
                      value={pref.frequency}
                      onChange={(e) =>
                        handlePreferenceChange(index, 'frequency', e.target.value)
                      }
                      size="sm"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Digest</option>
                      <option value="never">Never</option>
                    </Select>
                  </FormControl>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <Heading size="md" mb={6}>
          Email Templates
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Template Name</Th>
              <Th>Subject</Th>
              <Th>Last Modified</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {templates.map((template) => (
              <Tr key={template.id}>
                <Td>{template.name}</Td>
                <Td>{template.subject}</Td>
                <Td>{new Date(template.lastModified).toLocaleDateString()}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(template.status)}>
                    {template.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  )
} 