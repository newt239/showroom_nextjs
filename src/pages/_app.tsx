import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Context, createContext, Dispatch } from 'react';
import { useBoardState } from 'src/store/board';
import { gameStateType, useGameState } from 'src/store/game';

// https://zenn.dev/nfunato/articles/typing-ccontext-arg
type GameContextType = {
  board: number[][]; setBoard: Dispatch<number[][]>;
  game: gameStateType; setGame: Dispatch<gameStateType>;
}
export let GlobalContext: Context<GameContextType>;

function MyApp({ Component, pageProps }: AppProps) {
  const [board, setBoard] = useBoardState();
  const [game, setGame] = useGameState();
  const value = { board, setBoard, game, setGame }

  GlobalContext = createContext(value);
  return (
    <GlobalContext.Provider value={value}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContext.Provider>
  )
}

export default MyApp
