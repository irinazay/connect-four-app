import { useNavigate } from "react-router-dom";
import "../styles/partials/_result.scss";
import { useRecoilValue } from "recoil";
import { winnerState } from "../state/game";

interface ResultProps {
  isVisible?: boolean;
  onClose: () => void;
}

export default function Result({ isVisible = false, onClose }: ResultProps) {
  const winner = useRecoilValue(winnerState);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
    onClose();
  };

  const handleShowScoreBoard = () => {
    navigate("/scoreboard");
    onClose();
  };

  return (
    <div className="result">
      <p>
        winner: <span>{winner}</span>
      </p>
      <div className="result-buttons">
        <button onClick={handleStartGame}>Start a new game</button>
        <button onClick={handleShowScoreBoard}>Go to the scoreboard</button>
      </div>
    </div>
  );
}
