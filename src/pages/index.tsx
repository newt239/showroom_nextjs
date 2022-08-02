import type { NextPage } from 'next'

import { Box, Link } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box>
      <Link href="/tetris">Tetris</Link>
    </Box>
  )
}

export default Home
