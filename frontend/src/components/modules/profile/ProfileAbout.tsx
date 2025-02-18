import {
  Box,
  Button,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { Profile } from '@/types/profile'

interface ProfileAboutProps {
  profile: Profile
}

export default function ProfileAbout({ profile }: ProfileAboutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bio, setBio] = useState(profile.bio)
  const bgColor = useColorModeValue('white', 'gray.700')

  const handleSave = async () => {
    // TODO: Implement save functionality
    onClose()
  }

  return (
    <>
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Stack spacing={4}>
          <Box>
            <Button
              size="sm"
              leftIcon={<FiEdit2 />}
              float="right"
              onClick={onOpen}
              variant="ghost"
            >
              Edit
            </Button>
            <Text whiteSpace="pre-wrap">{profile.bio}</Text>
          </Box>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={10}
              placeholder="Tell us about yourself..."
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
} 