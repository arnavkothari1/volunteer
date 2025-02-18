import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" py={4} textAlign="center">
      © {new Date().getFullYear()} Pathbuilder
    </Box>
  )
}

export default Footer
