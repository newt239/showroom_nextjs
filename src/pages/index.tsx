import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'src/styles/Home.module.scss'

import { Flex, Heading, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import TetrisGrid from 'src/components/TetrisGrid'
import Player from 'src/components/Player'
import NextPreview from 'src/components/NextPreview'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next TETRIS</title>
        <meta name="description" content="Web tetris app created with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as='h1'>Welcome to Next TETRIS!</Heading>
        <Flex style={{ gap: "1rem" }}>
          <TetrisGrid />
          <Flex style={{ flexDirection: "column", gap: "1rem" }}>
            <NextPreview />
            <Player />
          </Flex>
        </Flex>
      </main>
    </div>
  )
}

export default Home
