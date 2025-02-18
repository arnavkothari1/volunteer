import {
  Box,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Container,
  Stack,
} from '@chakra-ui/react'

interface LoadingStateProps {
  type?: 'card' | 'list' | 'detail'
  count?: number
}

export default function LoadingState({ type = 'card', count = 6 }: LoadingStateProps) {
  const CardSkeleton = () => (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      borderRadius="md"
    >
      <Skeleton height="20px" width="60%" mb={4} />
      <Skeleton height="16px" width="40%" mb={4} />
      <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      <Stack direction="row" spacing={2} mt={4}>
        <Skeleton height="20px" width="60px" />
        <Skeleton height="20px" width="60px" />
        <Skeleton height="20px" width="60px" />
      </Stack>
    </Box>
  )

  const ListSkeleton = () => (
    <Box padding="6" boxShadow="sm" bg="white">
      <Stack direction="row" spacing={4}>
        <Skeleton height="50px" width="50px" borderRadius="md" />
        <Stack flex={1}>
          <Skeleton height="20px" width="40%" />
          <SkeletonText mt="2" noOfLines={2} spacing="2" />
        </Stack>
      </Stack>
    </Box>
  )

  const DetailSkeleton = () => (
    <Stack spacing={8}>
      <Skeleton height="40px" width="60%" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
      <Stack direction="row" spacing={4}>
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="100px" />
      </Stack>
      <Box mt={8}>
        <SkeletonText mt="4" noOfLines={8} spacing="4" />
      </Box>
    </Stack>
  )

  return (
    <Container maxW="container.xl" py={8}>
      {type === 'card' && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Array(count).fill(0).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </SimpleGrid>
      )}
      {type === 'list' && (
        <Stack spacing={4}>
          {Array(count).fill(0).map((_, i) => (
            <ListSkeleton key={i} />
          ))}
        </Stack>
      )}
      {type === 'detail' && <DetailSkeleton />}
    </Container>
  )
} 