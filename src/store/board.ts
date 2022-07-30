import { atom, selector } from "recoil";

const generate2DArray1 = (y: number, x: number, val = 0) => {
  return Array.from(new Array(y), _ => new Array(x).fill(val));
};

export const boardState = atom<number[][]>({
  key: "atom.board",
  default: generate2DArray1(20, 10),
});