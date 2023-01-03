import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import ScoreBoard from "./components/ScoreBoard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/scoreboard" element={<ScoreBoard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
