import type { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { nextState } from 'src/store/game';

import { Box, Flex } from '@chakra-ui/react';
import { tetromino } from 'src/libs/tetromino';

const NextPreview: NextPage = () => {
  const next = useRecoilValue(nextState);

  return (
    <Box suppressHydrationWarning>
      {tetromino[next].map((row, i) => {
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
