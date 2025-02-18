import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiSettings } from 'react-icons/fi'

interface DashboardPreferences {
  layout: 'grid' | 'list'
  refreshInterval: number
  visibleMetrics: string[]
  defaultTimeRange: string
  theme: 'light' | 'dark'
}

interface DashboardCustomizationProps {
  preferences: DashboardPreferences
  onSave: (preferences: DashboardPreferences) => Promise<void>
}

export default function DashboardCustomization({
  preferences,
  onSave,
}: DashboardCustomizationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [settings, setSettings] = useState(preferences)

  const handleSave = async () => {
    await onSave(settings)
    onClose()
  }

  const availableMetrics = [
    'applications',
    'interviews',
    'responses',
    'skills',
    'timeline',
    'status',
  ]

  return (
    <>
      <Button leftIcon={<FiSettings />} onClick={onOpen}>
        Customize Dashboard
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dashboard Preferences</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>
              <FormControl>
                <FormLabel>Layout</FormLabel>
                <Select
                  value={settings.layout}
                  onChange={(e) =>
                    setSettings({ ...settings, layout: e.target.value as 'grid' | 'list' })
                  }
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Auto-refresh Interval</FormLabel>
                <Select
                  value={settings.refreshInterval}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      refreshInterval: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>Manual refresh</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Visible Metrics</FormLabel>
                <Stack spacing={2}>
                  {availableMetrics.map((metric) => (
                    <Checkbox
                      key={metric}
                      isChecked={settings.visibleMetrics.includes(metric)}
                      onChange={(e) => {
                        const newMetrics = e.target.checked
                          ? [...settings.visibleMetrics, metric]
                          : settings.visibleMetrics.filter((m) => m !== metric)
                        setSettings({ ...settings, visibleMetrics: newMetrics })
                      }}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </Checkbox>
                  ))}
                </Stack>
              </FormControl>

              <FormControl>
                <FormLabel>Default Time Range</FormLabel>
                <Select
                  value={settings.defaultTimeRange}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultTimeRange: e.target.value })
                  }
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </Select>
              </FormControl>

              <Button colorScheme="blue" onClick={handleSave}>
                Save Preferences
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
} 