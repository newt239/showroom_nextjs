import type { NextPage } from 'next'

import { Box, Flex, theme } from '@chakra-ui/react';
import { tetromino } from 'src/libs/tetromino';
import { useContext } from 'react';
import { GlobalContext } from 'src/pages/_app';

const NextPreview: NextPage = () => {
  const { game } = useContext(GlobalContext);

  const decideColor = (cell: number) => {
    switch (cell) {
      case 1:
        return theme.colors.blue[500]
      case 2:
        return theme.colors.green[500]
      case 3:
        return theme.colors.purple[500]
      case 4:
        return theme.colors.red[500]
      case 5:
        return theme.colors.yellow[500]
      case 0:
        return "white"
    }
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
