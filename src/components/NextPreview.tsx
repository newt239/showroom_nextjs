import type { NextPage } from 'next'

import { Box, Flex, theme } from '@chakra-ui/react';
import { tetromino, tetrominoColors } from 'src/libs/tetromino';
import { useContext } from 'react';
import { GlobalContext } from 'src/pages/_app';

const NextPreview: NextPage = () => {
  const { game } = useContext(GlobalContext);

  const decideColor = (cell: number) => {
    return tetrominoColors[cell]
  }
  return (
    <Box suppressHydrationWarning>
      {tetromino[game.current.next].map((row, i) => {
        return (
          <Flex key={i}>
            {row.map((cell, j) => {
              return (
                <Box suppressHydrationWarning key={`${i}-${j}`} style={{
                  width: 20,
                  height: 20,
                  border: "1px solid black",
                  backgroundColor: decideColor(cell)
                }}></Box>
              )
            })}
          </Flex>
        )
      })}
    </Box>
  )
}

export default NextPreview
