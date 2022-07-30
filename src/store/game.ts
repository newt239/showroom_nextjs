import { atom } from "recoil";

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
    state: [],
    x: 0,
    y: 0
  },
});

export const nextState = atom({
  key: "atom.next",
  default: 0,
});