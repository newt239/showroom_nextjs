import type { NextPage } from 'next'
import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { GlobalContext } from 'src/pages/_app';

const TetrisGrid: NextPage = () => {
  const { board, game } = useContext(GlobalContext);
  const decideColor = (cell: number, i: number, j: number) => {
    if (cell !== 0) {
      return "black"
    }
    if (game.y <= i && game.x <= j && i - game.y < 5 && j - game.x < 5) {
      if (game.state[i - game.y][j - game.x] !== 0) {
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
