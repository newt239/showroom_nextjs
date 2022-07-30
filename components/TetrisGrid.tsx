import type { NextPage } from 'next'
import { Heading, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const TetrisGrid: NextPage = () => {
  return (
    <div>
      <Heading as='h1'>Welcome to Next TETRIS!</Heading>
      <div>
        <Link href='https://nextjs.org/docs' isExternal>
          Documentation &rarr; <ExternalLinkIcon mx='2px' />
        </Link>
      </div>
    </div>
  )
}

export default TetrisGrid
