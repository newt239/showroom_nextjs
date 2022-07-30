import { atom } from "recoil";

const generate2DArray1 = (m: number, n: number, val = 0) => {
  return Array.from(new Array(m), _ => new Array(n).fill(val));
};

export const boardState = atom({
  key: "board",
  default: generate2DArray1(20, 10),
});