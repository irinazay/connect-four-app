import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "../styles/partials/_scoreBoard.scss";
import { winnersState } from "../state/game";

export default function ScoreBoard() {
  const winners = useRecoilValue(winnersState);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  const handleShowScoreBoard = () => {
    navigate("/");
  };

  return (
    <div className="scoreboard">
      <div className="scoreboard-details">
        <div className="scoreboard-header">Winners</div>
        <div className="scoreboard-column-names">
          <p> Name </p>
          <p>Time</p>
          <p>Steps</p>
        </div>
        {winners.map((w: any) => (
          <div key={"winner" + w.time} id="winners">
            <p> {w.name} </p>
            <p> {w.time}</p>
            <p> {w.steps}</p>
          </div>
        ))}
        <div className="scoreboard-buttons">
          <button onClick={handleStartGame}>New game</button>
          <button onClick={handleShowScoreBoard}>Home page</button>
        </div>
      </div>
    </div>
  );
}
