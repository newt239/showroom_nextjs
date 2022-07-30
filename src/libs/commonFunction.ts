export const decideTetrominoType = () => Math.floor(Math.random() * (5 - 1)) + 1;

export const generate2DArray1 = (y: number, x: number, val = 0) => {
  return Array.from(new Array(y), _ => new Array(x).fill(val));
};