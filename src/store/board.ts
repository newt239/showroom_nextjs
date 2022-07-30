import { atom } from "recoil";
import { generate2DArray1 } from "src/libs/commonFunction";

export const boardState = atom<number[][]>({
  key: "atom.board",
  default: generate2DArray1(20, 10),
});