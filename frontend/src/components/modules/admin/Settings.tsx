import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'

interface SystemSettings {
  maxUploadSize: number
  allowedFileTypes: string[]
  userQuota: number
  maintenanceMode: boolean
  debugMode: boolean
  apiRateLimit: number
  emailSettings: {
    smtpServer: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
  }
  backupSettings: {
    frequency: 'daily' | 'weekly' | 'monthly'
    retention: number
    autoBackup: boolean
  }
}

export default function Settings() {
  const [settings, setSettings] = useState<SystemSettings>({
    maxUploadSize: 10,
    allowedFileTypes: ['.pdf', '.doc', '.docx'],
    userQuota: 1000,
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: 100,
    emailSettings: {
      smtpServer: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
    },
    backupSettings: {
      frequency: 'daily',
      retention: 30,
      autoBackup: true,
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const toast = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // API call to save settings
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      toast({
        title: 'Settings saved',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Stack spacing={8}>
      <Heading size="md">System Settings</Heading>

      <Box>
        <Heading size="sm" mb={4}>
          File Management
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>Max Upload Size (MB)</FormLabel>
            <NumberInput
              value={settings.maxUploadSize}
              onChange={(_, value) =>
                setSettings({ ...settings, maxUploadSize: value })
              }
              min={1}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>User Quota (MB)</FormLabel>
            <NumberInput
              value={settings.userQuota}
              onChange={(_, value) =>
                setSettings({ ...settings, userQuota: value })
              }
              min={100}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </SimpleGrid>
      </Box>

      <Divider />

      <Box>
        <Heading size="sm" mb={4}>
          System Configuration
        </Heading>
        <Stack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Maintenance Mode</FormLabel>
            <Switch
              isChecked={settings.maintenanceMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maintenanceMode: e.target.checked,
                })
              }
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Debug Mode</FormLabel>
            <Switch
              isChecked={settings.debugMode}
              onChange={(e) =>
                setSettings({ ...settings, debugMode: e.target.checked })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>API Rate Limit (requests/minute)</FormLabel>
            <NumberInput
              value={settings.apiRateLimit}
              onChange={(_, value) =>
                setSettings({ ...settings, apiRateLimit: value })
              }
              min={10}
              max={1000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Heading size="sm" mb={4}>
          Email Configuration
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>SMTP Server</FormLabel>
            <Input
              value={settings.emailSettings.smtpServer}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailSettings: {
                    ...settings.emailSettings,
                    smtpServer: e.target.value,
                  },
                })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>SMTP Port</FormLabel>
            <NumberInput
              value={settings.emailSettings.smtpPort}
              onChange={(_, value) =>
                setSettings({
                  ...settings,
                  emailSettings: {
                    ...settings.emailSettings,
                    smtpPort: value,
                  },
                })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </SimpleGrid>
      </Box>

      <Button
        colorScheme="blue"
        onClick={handleSave}
        isLoading={isSaving}
        loadingText="Saving..."
      >
        Save Settings
      </Button>
    </Stack>
  )
} 