import {
  Box,
  SimpleGrid,
  Heading,
  Select,
  Stack,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ComposedChart,
  Legend,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { analyticsExport } from '../../../utils/analyticsExport'

interface AnalyticsRecord {
  date: string;
  value: number;
  label: string;
  [key: string]: string | number; // for any additional properties
}

type ExportData = AnalyticsRecord[];

interface SkillsAnalysis {
  date: string; // Adjust according to your actual data structure
  value: number;
  label: string;
}

interface ResponseRate {
  date: string; // Adjust according to your actual data structure
  applications: number;
  responses: number;
}

interface InterviewSuccess {
  date: string; // Adjust according to your actual data structure
  successRate: number; // Example field
}

interface ApplicationTrend {
  date: string; // Adjust according to your actual data structure
  applications: number; // Example field
}

interface AdvancedAnalyticsProps {
  data: {
    skillsAnalysis: SkillsAnalysis[];
    responseRates: ResponseRate[];
    interviewSuccess: InterviewSuccess[]; // Updated type
    applicationTrends: ApplicationTrend[]; // Updated type
  }
  // Remove onExport if not needed
  // onExport: (type: string) => void
}

export default function AdvancedAnalytics({
  data,
}: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      // Transform the data to match ExportData type
      const exportData: ExportData = data.skillsAnalysis.map(item => ({
        date: item.date,
        value: item.value,
        label: item.label,
      }));

      await analyticsExport.exportData(exportData, {
        format,
        timeRange,
      });
    } catch (error) {
      console.error('Error exporting data:', error)
      // Handle error appropriately
    }
  }

  return (
    <Stack spacing={8}>
      <HStack justify="space-between">
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
        <Button
          leftIcon={<FiDownload />}
          onClick={() => handleExport('csv')}
        >
          Export Data
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="md" mb={6}>
            Skills Analysis
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.skillsAnalysis}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <Radar
                  name="Skills Match"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
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
            Response Rate Analysis
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.responseRates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" />
                <Line dataKey="responses" stroke="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Additional charts... */}
      </SimpleGrid>
    </Stack>
  )
} 