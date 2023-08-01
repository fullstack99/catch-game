import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainBoard() {
  const navigate = useNavigate();

  const onLeaderBoard = () => {
    navigate('/leaderboard')
  }

  const onGameStart = () => {
    navigate('/game')
  }

  return (
    <div className="main-board flex items-center justify-center flex-col">
      <button className="bg-sky-500 hover:bg-sky-700 py-2 px-4 text-white w-48 rounded-lg" onClick={onGameStart}>
        Start Game
      </button>
      <button className="bg-sky-500 hover:bg-sky-700 py-2 px-4 text-white w-48 rounded-lg btn mt-8"
        onClick={onLeaderBoard}>
        Leaderboard
      </button>
    </div>
  );
}
