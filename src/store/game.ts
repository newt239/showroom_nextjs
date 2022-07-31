import { useReducer } from "react";
import { decideTetrominoType, generate2DArray1 } from "src/libs/commonFunction";
import { tetromino } from "src/libs/tetromino";

export type GameStateType = {
  current: {
    type: number;
    state: number[][];
    x: number;
    y: number;
    next: number;
  };
  board: number[][];
}
export type ActionType = {
  type: string;
  payload?: number | number[][];
}
export const useGameState = () => {
  // typeとnextの初期値をランダムにすると2回呼び出されているため2回目のクリックで表示が変わってしまう
  const initialValue = {
    current: {
      type: 1,
      state: tetromino[1],
      x: 0,
      y: 0,
      next: 2,
    },
    board: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }
  const reducer = (state: GameStateType, action: ActionType) => {
    if (typeof action.payload === "number") {
      if (action.type === "x") {
        return { ...state, current: { ...state.current, x: state.current.x + action.payload } }
      } else {
        return { ...state, current: { ...state.current, y: state.current.y + action.payload } }
      }
    } else if (action.type === "state" && typeof action.payload !== "undefined") {
      return { ...state, current: { ...state.current, state: action.payload } }
    } else if (action.type === "reset") {
      const savedBoard = state.board.map((row, i) => {
        return row.map((cell, j) => {
          if (cell !== 0) {
            return cell
          } else if (state.current.y <= i && state.current.x <= j && i - state.current.y < 5 && j - state.current.x < 5) {
            return state.current.state[i - state.current.y][j - state.current.x]
          } else {
            return 0
          }
        })
      });
      let lines: number[] = [];
      savedBoard.map((row, i) => {
        if (Math.min(...row) === 0) {
          lines.push(i);
        }
      });
      let newBoard: number[][] = [];
      for (const line of lines) {
        newBoard.push(savedBoard[line]);
      }
      for (let i = 0; i < 20 - lines.length; i++) {
        newBoard.unshift(new Array<number>(10).fill(0));
      }
      return { current: { type: state.current.next, state: tetromino[state.current.next], x: 0, y: state.current.next === 1 ? 0 : -1, next: decideTetrominoType() }, board: newBoard }
    }
    return state
  }
  const [game, gameDispatch] = useReducer(reducer, initialValue);

  return { game, gameDispatch }
}