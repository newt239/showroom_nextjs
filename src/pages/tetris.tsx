import { Context, createContext, Dispatch } from 'react'

import { Alert, AlertIcon, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'

import type { NextPage } from 'next'

import NextPreview from 'src/components/NextPreview'
import Player from 'src/components/Player'
import TetrisGrid from 'src/components/TetrisGrid'
import { GameStateType, ActionType, useGameState } from 'src/store/game'
import styles from 'src/styles/Home.module.scss'

// https://zenn.dev/nfunato/articles/typing-ccontext-arg
type GameContextType = {
  game: GameStateType
  gameDispatch: Dispatch<ActionType>
}
export let GlobalContext: Context<GameContextType>

const Tetris: NextPage = () => {
  const { game, gameDispatch } = useGameState()
  const value = { game, gameDispatch: gameDispatch }
  GlobalContext = createContext(value)
  return (
    <GlobalContext.Provider value={value}>
      <div className={styles.container}>
        <Head>
          <title>Next TETRIS</title>
          <meta name='description' content='Web tetris app created with Next.js' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className={styles.main}>
          <Flex style={{ flexDirection: 'column', textAlign: 'center' }}>
            <Heading as='h1'>Welcome to Next TETRIS!</Heading>
            <p>score:{game.score}</p>
            {game.start && !game.end ? (
              <Alert status='info'>
                <AlertIcon />
                start!
              </Alert>
            ) : game.start && game.end ? (
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
          <Flex style={{ gap: '1rem', marginTop: '1rem' }}>
            <TetrisGrid />
            <Flex style={{ flexDirection: 'column', gap: '1rem' }}>
              <NextPreview />
              <Player />
            </Flex>
          </Flex>
        </main>
      </div>
    </GlobalContext.Provider>
  )
}

export default Tetris
