import type { NextPage } from 'next'

import { Box, Flex } from '@chakra-ui/react';
import { tetromino } from 'src/libs/tetromino';
import { useContext } from 'react';
import { GlobalContext } from 'src/pages/_app';

const NextPreview: NextPage = () => {
  const { game } = useContext(GlobalContext);

  return (
    <Box suppressHydrationWarning>
      {tetromino[game.next].map((row, i) => {
        return (
          <Flex key={i}>
            {row.map((cell, j) => {
              return (
                <Box suppressHydrationWarning key={`${i}-${j}`} style={{
                  width: 20,
                  height: 20,
                  border: "1px solid black",
                  backgroundColor: cell === 0 ? "white" : "black"
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
