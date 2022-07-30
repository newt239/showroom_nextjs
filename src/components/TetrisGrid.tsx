import type { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { boardState } from 'src/store/board'
import { currentState } from 'src/store/game';
import { Box, Flex } from '@chakra-ui/react';

const TetrisGrid: NextPage = () => {
  const board = useRecoilValue(boardState);
  const current = useRecoilValue(currentState);

  const decideColor = (cell: number, i: number, j: number) => {
    if (cell !== 0) {
      return "black"
    }
    if (current.y <= i && current.x <= j && i - current.y < 5 && j - current.x < 5) {
      if (current.state[i - current.y][j - current.x] !== 0) {
        return "black"
      }
    }
    return "white"
  }
  return (
    <Box>
      {board.map((row, i) => {
        return (
          <Flex key={i}>
            {row.map((cell, j) => {
              return (<Box suppressHydrationWarning key={`${i}-${j}`} style={{
                width: 20,
                height: 20,
                border: "1px solid black",
                backgroundColor: decideColor(cell, i, j)
              }}>
              </Box>)
            })}
          </Flex>
        )
      })}
      <div>
      </div>
    </Box>
  )
}

export default TetrisGrid
