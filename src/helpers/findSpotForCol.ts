export default function findSpotForCol(
  x: number,
  board: string[][],
  HEIGHT: number
) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}
