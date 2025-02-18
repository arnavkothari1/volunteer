import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Text,
  HStack,
  Badge,
} from '@chakra-ui/react'
import { FiUpload, FiDownload, FiTrash2, FiMoreVertical } from 'react-icons/fi'
import { useRef } from 'react'
import { ApplicationDocument } from '@/types/application'

interface DocumentManagerProps {
  documents: ApplicationDocument[]
  onUpload: (file: File) => Promise<void>
  onDownload: (document: ApplicationDocument) => Promise<void>
  onDelete: (documentId: string) => Promise<void>
}

export default function DocumentManager({
  documents,
  onUpload,
  onDownload,
  onDelete,
}: DocumentManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await onUpload(file)
        toast({
          title: 'Success',
          description: 'Document uploaded successfully',
          status: 'success',
          duration: 3000,
        })
      } catch (error) {
        console.error('Error uploading document:', error)
        toast({
          title: 'Error',
          description: 'Failed to upload document',
          status: 'error',
          duration: 3000,
        })
      }
    }
  }

  const formatFileSize = (): string => {
    // This would normally calculate the file size from the actual file
    return '2.5 MB' // Placeholder
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="lg" fontWeight="bold">
          Documents
        </Text>
        <Button
          leftIcon={<FiUpload />}
          colorScheme="blue"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Size</Th>
            <Th>Uploaded</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents.map((doc) => (
            <Tr key={doc.id}>
              <Td>{doc.name}</Td>
              <Td>
                <Badge
                  colorScheme={
                    doc.type === 'resume'
                      ? 'green'
                      : doc.type === 'coverLetter'
                      ? 'blue'
                      : 'gray'
                  }
                >
                  {doc.type}
                </Badge>
              </Td>
              <Td>{formatFileSize()}</Td>
              <Td>{new Date(doc.uploadedAt).toLocaleDateString()}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<FiDownload />}
                      onClick={() => onDownload(doc)}
                    >
                      Download
                    </MenuItem>
                    <MenuItem
                      icon={<FiTrash2 />}
                      onClick={() => onDelete(doc.id)}
                      color="red.500"
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
} 