import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'src/styles/Home.module.scss'

import { Alert, AlertIcon, Flex, Heading, Link } from '@chakra-ui/react'
import TetrisGrid from 'src/components/TetrisGrid'
import Player from 'src/components/Player'
import NextPreview from 'src/components/NextPreview'
import { useContext } from 'react'
import { GlobalContext } from './_app'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Tetris: NextPage = () => {
  const { game } = useContext(GlobalContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Next TETRIS</title>
        <meta name="description" content="Web tetris app created with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Flex style={{ flexDirection: "column", textAlign: "center" }}>
          <Heading as='h1'>Welcome to Next TETRIS!</Heading>
          <p>score:{game.score}</p>
          {(game.start && !game.end) ? (
            <Alert status='info'>
              <AlertIcon />
              start!
            </Alert>
          ) : (game.start && game.end) ? (
            <Alert status='error'>
              <AlertIcon />
              game over!
            </Alert>
          ) : (
            <Alert status='info'>
              <AlertIcon />
              click start to play
            </Alert>
          )}
        </Flex>
        <Flex style={{ gap: "1rem", marginTop: "1rem" }}>
          <TetrisGrid />
          <Flex style={{ flexDirection: "column", gap: "1rem" }}>
            <NextPreview />
            <Player />
          </Flex>
        </Flex>
        <Link href="https://github.com/newt239/tetris-nextjs" isExternal sx={{ marginTop: "1rem" }}>
          newt239/tetris-nextjs<ExternalLinkIcon mx={2} />
        </Link>
      </main>
    </div >
  )
}

export default Tetris
