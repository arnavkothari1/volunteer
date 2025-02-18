import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react'
import UserManagement from '../admin/UserManagement'
import SystemMetrics from '../admin/SystemMetrics'
import ContentModeration from '../admin/ContentModeration'
import Settings from '../admin/Settings'

export default function AdminDashboard() {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={6}
    >
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Metrics</Tab>
          <Tab>Moderation</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserManagement />
          </TabPanel>
          <TabPanel>
            <SystemMetrics />
          </TabPanel>
          <TabPanel>
            <ContentModeration />
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
} 