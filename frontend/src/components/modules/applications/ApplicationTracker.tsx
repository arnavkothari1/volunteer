import {
  Box,
  Stack,
  Heading,
  Text,
  Badge,
  Progress,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiClock, FiCheck, FiX } from 'react-icons/fi'
import { Application, ApplicationStatus } from '@/types/application'

interface ApplicationTrackerProps {
  application: Application
  onStatusUpdate: (status: ApplicationStatus) => void
}

const statusColors: Record<ApplicationStatus, string> = {
  draft: 'gray',
  submitted: 'blue',
  reviewing: 'purple',
  interview: 'orange',
  offered: 'green',
  accepted: 'green',
  rejected: 'red',
  withdrawn: 'gray',
}

const statusProgress: Record<ApplicationStatus, number> = {
  draft: 0,
  submitted: 20,
  reviewing: 40,
  interview: 60,
  offered: 80,
  accepted: 100,
  rejected: 100,
  withdrawn: 100,
}

export default function ApplicationTracker({
  application,
  onStatusUpdate,
}: ApplicationTrackerProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      borderColor={borderColor}
    >
      <Stack spacing={6}>
        <HStack justify="space-between">
          <Heading size="md">Application Status</Heading>
          <Badge
            colorScheme={statusColors[application.status]}
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </HStack>

        <Box>
          <Progress
            value={statusProgress[application.status]}
            colorScheme={statusColors[application.status]}
            borderRadius="full"
            size="sm"
            mb={4}
          />
          
          <Stack spacing={4}>
            {application.timeline.map((event) => (
              <HStack key={event.id} spacing={4}>
                {event.status === application.status && (
                  <Box color="blue.500">
                    <FiClock />
                  </Box>
                )}
                <Text color="gray.600">
                  {new Date(event.date).toLocaleDateString()} - {event.status}
                </Text>
                {event.note && (
                  <Text fontSize="sm" color="gray.500">
                    {event.note}
                  </Text>
                )}
              </HStack>
            ))}
          </Stack>
        </Box>

        <HStack spacing={4}>
          {application.status === 'offered' && (
            <>
              <Button
                leftIcon={<FiCheck />}
                colorScheme="green"
                onClick={() => onStatusUpdate('accepted')}
              >
                Accept Offer
              </Button>
              <Button
                leftIcon={<FiX />}
                colorScheme="red"
                variant="outline"
                onClick={() => onStatusUpdate('rejected')}
              >
                Decline Offer
              </Button>
            </>
          )}
          {['submitted', 'reviewing', 'interview'].includes(application.status) && (
            <Button
              leftIcon={<FiX />}
              colorScheme="gray"
              variant="outline"
              onClick={() => onStatusUpdate('withdrawn')}
            >
              Withdraw Application
            </Button>
          )}
        </HStack>
      </Stack>
    </Box>
  )
} 