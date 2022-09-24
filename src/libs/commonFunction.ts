export const decideTetrominoType = () => Math.floor(Math.random() * (7 - 1)) + 1

export const generate2DArray1 = (y: number, x: number, val = 0) => {
  return Array.from(new Array(y), (_) => new Array<number>(x).fill(val))
}
