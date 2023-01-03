export default function initialiseBoard(width: number, height: number) {
  let board: string[][] = [];
  for (let y = 0; y < height; y++) {
    board.push(Array.from({ length: width }));
  }

  return board;
}
