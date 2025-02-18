import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Profile } from '@/types/profile'

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  headline: z.string().min(1, 'Headline is required'),
  bio: z.string().min(1, 'Bio is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  github: z.string().url('Invalid GitHub URL').optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  profile?: Profile
  onSubmit: (data: ProfileFormData) => Promise<void>
  isLoading?: boolean
}

export default function ProfileForm({ 
  profile, 
  onSubmit, 
  isLoading 
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {},
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input {...register('firstName')} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input {...register('lastName')} />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.headline}>
          <FormLabel>Headline</FormLabel>
          <Input {...register('headline')} />
          <FormErrorMessage>{errors.headline?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.bio}>
          <FormLabel>Bio</FormLabel>
          <Textarea {...register('bio')} rows={5} />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.location}>
          <FormLabel>Location</FormLabel>
          <Input {...register('location')} />
          <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} type="email" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input {...register('phone')} />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isInvalid={!!errors.website}>
            <FormLabel>Website</FormLabel>
            <Input {...register('website')} />
            <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.linkedin}>
            <FormLabel>LinkedIn</FormLabel>
            <Input {...register('linkedin')} />
            <FormErrorMessage>{errors.linkedin?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.github}>
          <FormLabel>GitHub</FormLabel>
          <Input {...register('github')} />
          <FormErrorMessage>{errors.github?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Save Profile
        </Button>
      </Stack>
    </form>
  )
} 