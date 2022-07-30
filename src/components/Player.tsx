import type { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { currentState } from 'src/store/game'
import { boardState } from 'src/store/board'
import { Button } from '@chakra-ui/react'
import { tetromino } from 'src/libs/tetromino'


const Player: NextPage = () => {
  const [current, setCurrent] = useRecoilState(currentState);
  const [board, setBoard] = useRecoilState(boardState);

  const blockDown = () => {
    const newY = current.y + 1;
    if (canMove(tetromino[current.type], current.x, newY)) {
      setCurrent({ ...current, y: newY });
      if (!canMove(tetromino[current.type], current.x, newY + 1)) {
        checkNext();
      }
    }
  }

  const blockLeft = () => {
    if (canMove(tetromino[current.type], current.x - 1, current.y)) {
      setCurrent({ ...current, x: current.x - 1 });
    }
  }

  const blockRight = () => {
    if (canMove(tetromino[current.type], current.x + 1, current.y)) {
      setCurrent({ ...current, x: current.x + 1 });
    }
  }

  const checkNext = () => {
    setBoard(board.map((row, i) => {
      return row.map((cell, j) => {
        if (current.y < i && current.x <= j && i - current.y < 5 && j - current.x < 5) {
          return tetromino[current.type][i - current.y - 1][j - current.x]
        } else {
          return cell
        }
      })
    }));
    setCurrent({ type: 1, x: 0, y: 0 })
  }

  const canMove = (block: number[][], x: number, y: number) => {
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        if (x + v < 0 && block[h][v] > 0) {
          return false;
        }
        if (x + v > board[0].length - 1 && block[h][v] > 0) {
          return false;
        }
        if (y + h > board.length - 1 && block[h][v] > 0) {
          return false;
        }
        if (y + h < 0 && block[h][v] > 0) {
          return false;
        }
        if (x + v < 0 || x + v > board[0].length - 1 || y + h > board.length - 1 || y + h < 0) {
          continue;
        }
        if (board[y + h][x + v] > 0 && block[h][v] > 0) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <>
      <Button onClick={blockDown}>down</Button>
      <Button onClick={blockLeft}>left</Button>
      <Button onClick={blockRight}>right</Button>
    </>
  )
}

export default Player
