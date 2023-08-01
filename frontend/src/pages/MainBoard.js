import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainBoard() {
  const navigate = useNavigate();

  return (
    <div className="main-board flex items-center justify-center flex-col">
      <button
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 text-white w-48 rounded-lg"
        onClick={() => navigate('/game')}>
        Start Game
      </button>
      <button
        className="bg-sky-500 hover:bg-sky-700 py-2 px-4 text-white w-48 rounded-lg btn mt-8"
        onClick={() => navigate('/leaderboard')}>
        Leaderboard
      </button>
    </div>
  );
}
