import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Button,
  Divider,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState } from 'react'

interface UserSettingsProps {
  initialSettings: {
    emailNotifications: boolean
    pushNotifications: boolean
    profileVisibility: 'public' | 'private' | 'connections'
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
  }
  onSave: (settings: {
    emailNotifications: boolean
    pushNotifications: boolean
    profileVisibility: 'public' | 'private' | 'connections'
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
  }) => Promise<void>
}

export default function UserSettings({
  initialSettings,
  onSave,
}: UserSettingsProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(settings)
      toast({
        title: 'Success',
        description: 'Settings saved successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="md" mb={6}>
          Notification Preferences
        </Heading>
        <Stack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Email Notifications</FormLabel>
            <Switch
              isChecked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications: e.target.checked,
                })
              }
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Push Notifications</FormLabel>
            <Switch
              isChecked={settings.pushNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  pushNotifications: e.target.checked,
                })
              }
            />
          </FormControl>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={6}>
          Privacy Settings
        </Heading>
        <FormControl>
          <FormLabel>Profile Visibility</FormLabel>
          <Select
            value={settings.profileVisibility}
            onChange={(e) =>
              setSettings({
                ...settings,
                profileVisibility: e.target.value as 'public' | 'private' | 'connections',
              })
            }
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="connections">Connections Only</option>
          </Select>
        </FormControl>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={6}>
          Preferences
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <Select
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' | 'system' })
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </Box>

      <Button
        colorScheme="blue"
        onClick={handleSave}
        isLoading={isSaving}
        loadingText="Saving..."
      >
        Save Changes
      </Button>
    </Stack>
  )
} 