import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import initialiseBoard from "../helpers/initialiseBoard";
import Board from "./Board";
import Result from "./Result";
import countTimer from "../helpers/countTimer";
import "../styles/partials/_game.scss";
import findSpotForCol from "../helpers/findSpotForCol";
import checkForWin from "../helpers/checkForWin";
import { playersInfoState, winnerState, winnersState } from "../state/game";

const WIDTH = 7;
const HEIGHT = 6;

export default function Game() {
  const [board, setBoard] = useState<string[][]>(
    initialiseBoard(WIDTH, HEIGHT)
  );
  const [{ name1, name2 }, setPlayers] = useRecoilState(playersInfoState);
  const [counter, setCounter] = useState(0);
  const [steps, setSteps] = useState(1);
  const [currPlayer, setCurrPlayer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winner, setWinner] = useRecoilState(winnerState);
  const setWinners = useSetRecoilState(winnersState);
  const navigate = useNavigate();

  if (!name1 || !name2) {
    navigate("/");
  }

  function handleClick(x: number) {
    const y = findSpotForCol(x, board, HEIGHT);
    if (y === null) {
      return;
    }

    board[y][x] = currPlayer;
    const newBoard = [...board];
    newBoard[y][x] = currPlayer;
    setBoard(newBoard);

    if (checkForWin(board, HEIGHT, WIDTH, currPlayer)) {
      setWinners((winners) => [
        ...winners,
        {
          name: currPlayer,
          time: countTimer(counter),
          steps: steps,
        },
      ]);
      setPlayers((players) => ({
        ...players,
        ...{
          name1: players.name2,
          age1: players.age2,
          name2: players.name1,
          age2: players.age1,
        },
      }));
      setSteps(0);
      setCurrPlayer("");
      setWinner(currPlayer);
      setIsModalOpen(true);
      return;
    }

    // check for tie
    if (board.every((row: string[]) => row.every((cell: string) => cell))) {
      setWinners((winners) => [
        ...winners,
        {
          name: currPlayer,
          time: countTimer(counter),
          steps: steps,
        },
      ]);
      setSteps(0);
      setWinner(currPlayer);
      setIsModalOpen(true);
      return;
    }

    // switch players
    if (currPlayer === name1) {
      setCurrPlayer(name2);
    } else {
      setSteps((s) => s + 1);
      setCurrPlayer(name1);
    }
  }

  useEffect(() => {
    setCurrPlayer(name1);
  }, [name1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClose = () => {
    setWinner("");
    setIsModalOpen(false);
    setBoard(initialiseBoard(WIDTH, HEIGHT));
  };

  return (
    <>
      <div className="board">
        <div style={{}}>
          {!!winner ? "" : <p>{`${currPlayer}'s move`}</p>}
          <Board
            squares={board}
            onClick={(i: any) => handleClick(i)}
            width={WIDTH}
            height={HEIGHT}
          />
        </div>
        <div className="modal">
          {isModalOpen && (
            <>
              <div id="page-mask"></div>
              <Result isVisible={isModalOpen} onClose={handleClose} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
