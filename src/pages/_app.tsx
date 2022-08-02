import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <>
        <Box sx={{ minHeight: "90vh" }}>
          <Component {...pageProps} />
        </Box>
        <Container sx={{ textAlign: "center", my: "1rem" }}>
          <Link href="https://github.com/newt239/showroom_nextjs" isExternal sx={{ marginTop: "1rem" }}>
            newt239/showroom_nextjs<ExternalLinkIcon mx={2} />
          </Link>
        </Container>
      </>
    </ChakraProvider>
  )
}

export default MyApp
