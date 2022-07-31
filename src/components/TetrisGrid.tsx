import type { NextPage } from 'next'
import { Box, color, Flex, theme } from '@chakra-ui/react';
import { useContext } from 'react';
import { GlobalContext } from 'src/pages/_app';

const TetrisGrid: NextPage = () => {
  const { game } = useContext(GlobalContext);
  const decideColor = (cell: number, i: number, j: number) => {
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
    }
    if (game.current.y <= i && game.current.x <= j && i - game.current.y < 5 && j - game.current.x < 5) {
      const tetrominoCell = game.current.state[i - game.current.y][j - game.current.x]
      switch (tetrominoCell) {
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
    return "white"
  }
  return (
    <Box>
      {game.board.map((row, i) => {
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
