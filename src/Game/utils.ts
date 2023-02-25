export const createCleanBoard = (size: number): boolean[][] =>
  [...Array(size).fill([...Array(size)].fill(false))];