export const createCleanBoard = (size: number): boolean[][] =>
  [...Array(size).fill([...Array(size)].fill(false))];

// returns true if boards have diff
export const compareBoards = <T extends boolean[][] = boolean[][]>(left: T, right: T): boolean => {
  let haveDifferences = false;

  console.log(left, right)

  for (let i = 0, iLength = left.length; i < iLength; i++) {
    for (let j = 0, jLength = left[i].length; j < jLength; j++) {
      if (left[i][j] !== right[i][j]) {
        haveDifferences = true;
        break;
      }
    }
  }

  return haveDifferences;
}