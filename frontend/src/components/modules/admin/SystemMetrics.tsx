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
  useColorModeValue,
  Select,
  HStack,
} from '@chakra-ui/react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState, useEffect } from 'react'

interface SystemMetric {
  timestamp: string
  value: number
  change: number
}

interface ServerLoadHistory {
  timestamp: string
  value: number
}

interface ResponseTimeHistory {
  timestamp: string; // Adjust according to your actual data structure
  value: number; // Adjust according to your actual data structure
}

interface Metrics {
  activeUsers: SystemMetric
  serverLoad: SystemMetric
  responseTime: SystemMetric
  errorRate: SystemMetric
  storageUsage: SystemMetric
  apiCalls: SystemMetric
  serverLoadHistory: ServerLoadHistory[]
  responseTimeHistory: ResponseTimeHistory[]
}

export default function SystemMetrics() {
  const [timeRange, setTimeRange] = useState('24h')
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    // Fetch metrics based on timeRange
    fetchMetrics(timeRange)
  }, [timeRange])

  const fetchMetrics = async (range: string) => {
    try {
      // API call to fetch metrics
      const response = await fetch(`/api/admin/metrics?range=${range}`)
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error('Error fetching metrics:', error)
    }
  }

  if (!metrics) return null

  return (
    <Stack spacing={8}>
      <HStack justify="space-between">
        <Heading size="md">System Metrics</Heading>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          width="200px"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <MetricCard
          label="Active Users"
          value={metrics.activeUsers.value}
          change={metrics.activeUsers.change}
          format="number"
        />
        <MetricCard
          label="Server Load"
          value={metrics.serverLoad.value}
          change={metrics.serverLoad.change}
          format="percentage"
        />
        <MetricCard
          label="Response Time"
          value={metrics.responseTime.value}
          change={metrics.responseTime.change}
          format="ms"
        />
        <MetricCard
          label="Error Rate"
          value={metrics.errorRate.value}
          change={metrics.errorRate.change}
          format="percentage"
        />
        <MetricCard
          label="Storage Usage"
          value={metrics.storageUsage.value}
          change={metrics.storageUsage.change}
          format="gb"
        />
        <MetricCard
          label="API Calls"
          value={metrics.apiCalls.value}
          change={metrics.apiCalls.change}
          format="number"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="sm" mb={6}>
            Server Load Over Time
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.serverLoadHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
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
          <Heading size="sm" mb={6}>
            Response Time Trends
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.responseTimeHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

interface MetricCardProps {
  label: string
  value: number
  change: number
  format: 'number' | 'percentage' | 'ms' | 'gb'
}

function MetricCard({ label, value, change, format }: MetricCardProps) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'percentage':
        return `${val.toFixed(1)}%`
      case 'ms':
        return `${val.toFixed(0)}ms`
      case 'gb':
        return `${val.toFixed(1)} GB`
      default:
        return val.toLocaleString()
    }
  }

  return (
    <Stat
      px={4}
      py={3}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
    >
      <StatLabel>{label}</StatLabel>
      <StatNumber>{formatValue(value, format)}</StatNumber>
      <StatHelpText>
        <StatArrow type={change >= 0 ? 'increase' : 'decrease'} />
        {Math.abs(change)}%
      </StatHelpText>
    </Stat>
  )
} 