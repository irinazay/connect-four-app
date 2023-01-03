import "../styles/partials/_board.scss";
import { useRecoilValue } from "recoil";
import { playersInfoState, winnerState } from "../state/game";

interface BoardProps {
  squares: string[][];
  width: number;
  height: number;
  onClick: (i: number) => void;
}

export default function Board(props: BoardProps) {
  const { squares, onClick, width, height } = props;
  const { name1, name2 } = useRecoilValue(playersInfoState);
  const winner = useRecoilValue(winnerState);
  const board = [];

  // make column tops (clickable area for adding a piece to that column)
  for (let x = 0; x < width; x++) {
    board.push(
      <button
        disabled={!!winner}
        key={"button " + x}
        onClick={() => onClick(x)}
        className="column-top"
      ></button>
    );
  }

  // make main part of board
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(
        <div
          key={"column " + `${y}-${x}`}
          className="column"
          id={`${y}-${x}`}
          style={{
            backgroundColor:
              squares[y][x] !== name1
                ? squares[y][x] === name2
                  ? "grey"
                  : "white"
                : "yellow",
          }}
        ></div>
      );
    }
    board.push(
      <div key={"row " + `${y}`} className="row">
        {row}
      </div>
    );
  }

  return <div>{board}</div>;
}
