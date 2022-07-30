import type { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { currentState, nextState } from 'src/store/game'
import { boardState } from 'src/store/board'
import { Button } from '@chakra-ui/react'
import { tetromino } from 'src/libs/tetromino'
import { decideTetrominoType } from 'src/libs/commonFunction'
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons'

const Player: NextPage = () => {
  const [current, setCurrent] = useRecoilState(currentState);
  const [next, setNext] = useRecoilState(nextState);
  const [board, setBoard] = useRecoilState(boardState);

  const blockDown = async () => {
    const newY = current.y + 1;
    if (canMove(current.state, current.x, newY)) {
      setCurrent({ ...current, y: newY });
      if (!canMove(current.state, current.x, newY + 1)) {
        touchBottom();
      }
    }
  }

  const blockLeft = () => {
    if (canMove(current.state, current.x - 1, current.y)) {
      setCurrent({ ...current, x: current.x - 1 });
    }
  }

  const blockRight = () => {
    if (canMove(current.state, current.x + 1, current.y)) {
      setCurrent({ ...current, x: current.x + 1 });
    }
  }

  const touchBottom = () => {
    const newBoard = board.map((row, i) => {
      return row.map((cell, j) => {
        if (cell !== 0) {
          return cell
        } else if (current.y < i && current.x <= j && i - current.y < 5 && j - current.x < 5) {
          return current.state[i - current.y - 1][j - current.x]
        } else {
          return 0
        }
      })
    });
    setBoard(newBoard);
    deleteLine(newBoard);
    setCurrent({ type: next, state: tetromino[next], x: 0, y: next === 1 ? 0 : -1 });
    setNext(decideTetrominoType());
  }

  const rotate = () => {
    if (current.type === 2) {
      return;
    }
    let block = current.state.map((row, i) => {
      return row.map((cell, j) => {
        return current.state[4 - j][i]
      })
    });
    if (canMove(block, current.x, current.y)) {
      setCurrent({ ...current, state: block });
    }
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

  const deleteLine = (currentBoard: number[][]) => {
    let lines: number[] = [];
    currentBoard.map((row, i) => {
      if (Math.min(...row) === 0) {
        lines.push(i);
      }
    });
    let newBoard: number[][] = [];
    for (const line of lines) {
      newBoard.push(currentBoard[line]);
    }
    for (let i = 0; i < 20 - lines.length; i++) {
      newBoard.unshift(new Array<number>(10).fill(0));
    }
    setBoard(newBoard);
  }

  return (
    <>
      <Button onClick={blockDown} colorScheme="blue"><ArrowDownIcon /></Button>
      <Button onClick={blockLeft} colorScheme="blue"><ArrowBackIcon /></Button>
      <Button onClick={blockRight} colorScheme="blue"><ArrowForwardIcon /></Button>
      <Button onClick={rotate} colorScheme="blue"><RepeatIcon /></Button>
    </>
  )
}

export default Player
