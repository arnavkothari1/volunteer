import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stack,
  Heading,
  Select,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useState } from 'react'

interface AnalyticsData {
  applications: {
    total: number
    trend: number
    byStatus: { name: string; value: number }[]
    timeline: { date: string; count: number }[]
  }
  interviews: {
    total: number
    trend: number
    upcoming: number
    completed: number
  }
  responses: {
    total: number
    trend: number
    avgResponseTime: number
  }
}

interface AnalyticsDashboardProps {
  data: AnalyticsData
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Stack spacing={8}>
      <Box>
        <HStack justify="space-between" mb={6}>
          <Heading size="lg">Analytics Dashboard</Heading>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            width="200px"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <StatCard
            label="Total Applications"
            value={data.applications.total}
            trend={data.applications.trend}
          />
          <StatCard
            label="Active Interviews"
            value={data.interviews.upcoming}
            trend={data.interviews.trend}
          />
          <StatCard
            label="Response Rate"
            value={`${((data.responses.total / data.applications.total) * 100).toFixed(1)}%`}
            trend={data.responses.trend}
          />
        </SimpleGrid>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="md" mb={6}>
            Application Timeline
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.applications.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="md" mb={6}>
            Applications by Status
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.applications.byStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.applications.byStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  trend: number
}

function StatCard({ label, value, trend }: StatCardProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>
          <StatArrow type={trend >= 0 ? 'increase' : 'decrease'} />
          {Math.abs(trend)}%
        </StatHelpText>
      </Stat>
    </Box>
  )
} 