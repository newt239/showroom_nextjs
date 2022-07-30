import { atom } from "recoil";
import { tetromino } from "src/libs/tetromino";

type currentStateType = {
  type: number;
  state: number[][];
  x: number;
  y: number;
}
export const currentState = atom<currentStateType>({
  key: "atom.current",
  default: {
    type: 2,
    state: tetromino[2],
    x: 0,
    y: 0
  },
});

export const nextState = atom({
  key: "atom.next",
  default: 0,
});