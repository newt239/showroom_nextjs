import { useReducer } from "react";
import { generate2DArray1 } from "src/libs/commonFunction";

export const useBoardState = () => {
  const reducer = (state: number[][], action: number[][]) => {
    return action
  }
  return useReducer(reducer, generate2DArray1(20, 10));
}