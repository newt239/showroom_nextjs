import { useContext } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import type { NextPage } from 'next'

import { tetromino, tetrominoColors } from 'src/libs/tetromino';
import { GlobalContext } from 'src/pages/tetris';

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
                  width: 18,
                  height: 18,
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
