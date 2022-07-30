import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'src/styles/Home.module.scss'

import { Heading, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import TetrisGrid from 'src/components/TetrisGrid'
import Player from 'src/components/Player'

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
        <div className={styles.grid}>
          <Link href='https://nextjs.org/docs' isExternal>
            Documentation <ExternalLinkIcon mx='2px' />
          </Link>
        </div>
        <TetrisGrid />
        <Player />
      </main>
    </div>
  )
}

export default Home
