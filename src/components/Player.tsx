import type { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { tetromino } from 'src/libs/tetromino'
import { decideTetrominoType } from 'src/libs/commonFunction'
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { GlobalContext } from 'src/pages/_app'

const Player: NextPage = () => {
  const { board, setBoard, game, setGame } = useContext(GlobalContext);

  const blockDown = () => {
    const newY = game.y + 1;
    console.log(game.state, game.x, newY);
    if (canMove(game.state, game.x, newY)) {
      setGame({ ...game, y: newY });
      console.log(game.state, game.x, newY + 1);
      if (!canMove(game.state, game.x, newY + 1)) {
        touchBottom();
      } else {
        return true;
      }
    }
    return false;
  }

  const blockLeft = () => {
    if (canMove(game.state, game.x - 1, game.y)) {
      setGame({ ...game, x: game.x - 1 });
    }
  }

  const blockRight = () => {
    if (canMove(game.state, game.x + 1, game.y)) {
      setGame({ ...game, x: game.x + 1 });
    }
  }

  const touchBottom = () => {
    const newBoard = board.map((row, i) => {
      return row.map((cell, j) => {
        if (cell !== 0) {
          return cell
        } else if (game.y < i && game.x <= j && i - game.y < 5 && j - game.x < 5) {
          return game.state[i - game.y - 1][j - game.x]
        } else {
          return 0
        }
      })
    });
    deleteLine(newBoard);
    setGame({ type: game.next, state: tetromino[game.next], x: 0, y: game.next === 1 ? 0 : -1, next: decideTetrominoType() });
  }

  const rotate = () => {
    if (game.type === 2) {
      return;
    }
    let block = game.state.map((row, i) => {
      return row.map((cell, j) => {
        return game.state[4 - j][i]
      })
    });
    if (canMove(block, game.x, game.y)) {
      setGame({ ...game, state: block });
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

  const deleteLine = (gameBoard: number[][]) => {
    let lines: number[] = [];
    gameBoard.map((row, i) => {
      if (Math.min(...row) === 0) {
        lines.push(i);
      }
    });
    let newBoard: number[][] = [];
    for (const line of lines) {
      newBoard.push(gameBoard[line]);
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
