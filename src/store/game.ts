import { useReducer } from "react";
import { decideTetrominoType } from "src/libs/commonFunction";
import { tetromino } from "src/libs/tetromino";

export type gameStateType = {
  type: number;
  state: number[][];
  x: number;
  y: number;
  next: number;
}
export const useGameState = () => {
  const firstTetrominoType = decideTetrominoType();
  const reducer = (state: gameStateType, action: gameStateType) => {
    return action
  }
  const initialValue = {
    type: firstTetrominoType,
    state: tetromino[firstTetrominoType],
    x: 0,
    y: firstTetrominoType === 1 ? 0 : -1,
    next: decideTetrominoType()
  }
  return useReducer(reducer, initialValue);
}