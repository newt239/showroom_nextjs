import type { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons'
import { useContext, useEffect } from 'react'
import { GlobalContext } from 'src/pages/_app'

const Player: NextPage = () => {
  const { game, gameDispatch } = useContext(GlobalContext);

  const blockDown = () => {
    if (game.start && !game.end) {
      const newY = game.current.y + 1;
      if (canMove(game.current.state, game.current.x, newY)) {
        gameDispatch({ type: "y", payload: 1 });
        if (!canMove(game.current.state, game.current.x, newY + 1)) {
          gameDispatch({ type: "reset" });
        }
      }
    }
  }

  // 1秒おきに1マスずつ自動で落下
  useEffect(() => {
    if (game.start && !game.end) {
      const intervalId = setInterval(() => blockDown(), 1000)
      return () => clearInterval(intervalId);
    }
  }, []);

  const downBottom = () => {
    if (game.start && !game.end) {
      let c = 1;
      while (true) {
        if (canMove(game.current.state, game.current.x, game.current.y + c)) {
          c++;
        } else {
          gameDispatch({ type: "y", payload: c - 1 });
          gameDispatch({ type: "reset" });
          break;
        }
      }
    }
  }

  const blockLeft = () => {
    if (game.start && !game.end) {
      if (canMove(game.current.state, game.current.x - 1, game.current.y)) {
        gameDispatch({ type: "x", payload: -1 });
      }
    }
  }

  const blockRight = () => {
    if (game.start && !game.end) {
      if (canMove(game.current.state, game.current.x + 1, game.current.y)) {
        gameDispatch({ type: "x", payload: 1 });
      }
    }
  }

  const rotate = () => {
    if (game.start && !game.end) {
      if (game.current.type === 2) {
        return;
      }
      let block = game.current.state.map((row, i) => {
        return row.map((cell, j) => {
          return game.current.state[4 - j][i]
        })
      });
      if (canMove(block, game.current.x, game.current.y)) {
        gameDispatch({ type: "state", payload: block });
      }
    }
  }

  const canMove = (block: number[][], x: number, y: number) => {
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        if (x + v < 0 && block[h][v] > 0) {
          return false;
        }
        if (x + v > game.board[0].length - 1 && block[h][v] > 0) {
          return false;
        }
        if (y + h > game.board.length - 1 && block[h][v] > 0) {
          return false;
        }
        if (y + h < 0 && block[h][v] > 0) {
          return false;
        }
        if (x + v < 0 || x + v > game.board[0].length - 1 || y + h > game.board.length - 1 || y + h < 0) {
          continue;
        }
        if (game.board[y + h][x + v] > 0 && block[h][v] > 0) {
          return false;
        }
      }
    }
    return true;
  }

  const startGame = () => {
    gameDispatch({ type: "start" })
  }

  const resetGame = () => {
    gameDispatch({ type: "game-reset" })
  }

  return (
    <>
      <Button onClick={downBottom} colorScheme="blue"><ArrowUpIcon /></Button>
      <Button onClick={blockDown} colorScheme="blue"><ArrowDownIcon /></Button>
      <Button onClick={blockLeft} colorScheme="blue"><ArrowBackIcon /></Button>
      <Button onClick={blockRight} colorScheme="blue"><ArrowForwardIcon /></Button>
      <Button onClick={rotate} colorScheme="blue"><RepeatIcon /></Button>
      <Button onClick={startGame} colorScheme="blue">start</Button>
      <Button onClick={resetGame} colorScheme="blue">reset</Button>
    </>
  )
}

export default Player
