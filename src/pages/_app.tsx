import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Context, createContext, Dispatch, DispatchWithoutAction } from 'react';
import { GameStateType, ActionType, useGameState } from 'src/store/game';

// https://zenn.dev/nfunato/articles/typing-ccontext-arg
type GameContextType = {
  game: GameStateType; gameDispatch: Dispatch<ActionType>;
}
export let GlobalContext: Context<GameContextType>;

function MyApp({ Component, pageProps }: AppProps) {
  const { game, gameDispatch } = useGameState();
  const value = { game, gameDispatch: gameDispatch }

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
