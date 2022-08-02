import { Context, createContext, Dispatch } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from 'src/styles/Home.module.scss'

import { Alert, AlertIcon, Flex, Heading, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import TetrisGrid from 'src/components/TetrisGrid'
import Player from 'src/components/Player'
import NextPreview from 'src/components/NextPreview'
import { GameStateType, ActionType, useGameState } from 'src/store/game';

// https://zenn.dev/nfunato/articles/typing-ccontext-arg
type GameContextType = {
  game: GameStateType; gameDispatch: Dispatch<ActionType>;
}
export let GlobalContext: Context<GameContextType>;

const Tetris: NextPage = () => {
  const { game, gameDispatch } = useGameState();
  const value = { game, gameDispatch: gameDispatch }
  GlobalContext = createContext(value);
  return (
    <GlobalContext.Provider value={value}>
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
    </GlobalContext.Provider>
  )
}

export default Tetris
