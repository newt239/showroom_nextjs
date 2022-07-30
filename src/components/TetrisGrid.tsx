import type { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { boardState } from 'src/store/board'
import { Box, Flex } from '@chakra-ui/react';
import { currentState } from 'src/store/game';
import { tetromino } from 'src/libs/tetromino'

const TetrisGrid: NextPage = () => {
  const board = useRecoilValue(boardState);
  const current = useRecoilValue(currentState);
  return (
    <Box>
      {board.map((row, i) => {
        return (
          <Flex key={i}>
            {row.map((cell, j) => {
              if (current.y <= i && current.x <= j && i - current.y < 5 && j - current.x < 5) {
                return (
                  <Box key={`${i}-${j}`} style={{
                    width: 20,
                    height: 20,
                    border: "1px solid black",
                    backgroundColor: tetromino[current.type][i - current.y][j - current.x] !== 0 ? "black" : "white"
                  }}>
                  </Box>
                )
              } else {
                return (
                  <Box key={`${i}-${j}`} style={{
                    width: 20,
                    height: 20,
                    border: "1px solid black",
                    backgroundColor: cell !== 0 ? "black" : "white"
                  }}>
                  </Box>
                )
              }
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
