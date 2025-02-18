import {
  Box,
  Image,
  Input,
  IconButton,
  useColorModeValue,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

interface ImageUploadProps {
  currentImage?: string
  onImageUpload: (file: File) => Promise<void>
  onImageRemove?: () => Promise<void>
  size?: string
  borderRadius?: string
}

export default function ImageUpload({
  currentImage,
  onImageUpload,
  onImageRemove,
  size = '150px',
  borderRadius = 'full',
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Call the hook unconditionally
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const bgColor = useColorModeValue('gray.50', 'gray.700')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      // Create preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      
      // Upload image
      await onImageUpload(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      // Revert preview on error
      setPreviewUrl(currentImage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async () => {
    try {
      setIsLoading(true)
      if (onImageRemove) {
        await onImageRemove()
      }
      setPreviewUrl(undefined)
    } catch (error) {
      console.error('Error removing image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      position="relative"
      width={size}
      height={size}
      borderRadius={borderRadius}
      borderWidth="2px"
      borderColor={borderColor}
      overflow="hidden"
      bg={bgColor}
    >
      {isLoading ? (
        <VStack justify="center" align="center" height="100%">
          <Spinner />
        </VStack>
      ) : (
        <>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          ) : (
            <VStack
              justify="center"
              align="center"
              height="100%"
              bg={bgColor}
            >
              <FiUpload size="24px" />
            </VStack>
          )}
        </>
      )}

      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        display="none"
      />

      <Box
        position="absolute"
        top="0"
        right="0"
        p="1"
        bg="rgba(0, 0, 0, 0.3)"
        borderBottomLeftRadius="md"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
      >
        {previewUrl && onImageRemove && (
          <IconButton
            aria-label="Remove image"
            icon={<FiX />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleRemove}
          />
        )}
      </Box>

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        cursor="pointer"
        onClick={() => fileInputRef.current?.click()}
      />
    </Box>
  )
} 