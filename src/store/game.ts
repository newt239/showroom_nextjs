import { atom } from "recoil";
import { decideTetrominoType } from "src/libs/commonFunction";
import { tetromino } from "src/libs/tetromino";

type currentStateType = {
  type: number;
  state: number[][];
  x: number;
  y: number;
}
const firstTetrominoType = decideTetrominoType();
export const currentState = atom<currentStateType>({
  key: "atom.current",
  default: {
    type: firstTetrominoType,
    state: tetromino[firstTetrominoType],
    x: 0,
    y: firstTetrominoType === 1 ? 0 : -1
  },
});

export const nextState = atom<number>({
  key: "atom.next",
  default: decideTetrominoType(),
});