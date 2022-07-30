import type { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { currentState } from 'src/store/game'
import { boardState } from 'src/store/board'
import { Button } from '@chakra-ui/react'
import { tetromino } from 'src/libs/tetromino'


const Player: NextPage = () => {
  const [current, setCurrent] = useRecoilState(currentState);
  const [board, setBoard] = useRecoilState(boardState);

  const gameStart = () => {
  };

  return (
    <Button onClick={gameStart}>start</Button>
  )
}

export default Player
