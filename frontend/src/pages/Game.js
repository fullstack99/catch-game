import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";

import GameScene from "./GameScene";
import { eventLeaderboard, GAME_WIDTH, GAME_HEIGHT } from "../utility";

import { Context as GameContext } from "../context/GameContext";
import ContactForm from "../components/ContactForm";

export default function Game() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { addScore } = useContext(GameContext);
  const [score, setScore] = useState(0);

  useEffect(() => {
    eventLeaderboard.on("endGame", (val) => {
      setScore(val.score);
      setIsOpenModal(true);
    });

    return () => eventLeaderboard.off("endGame");
  }, [navigate]);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.Orientation,
        parent: "game-container",
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
        },
      },
      input: {
        keyboard: true,
      },
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  const onSubmit = async (data) => {
    await addScore({
      name: data.name,
      score,
    });
    setIsOpenModal(false);
    navigate('/leaderboard')
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 w-1/3 max-w-lg">
            <ContactForm
              onClose={() => setIsOpenModal(false)}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
      <div
        className="absolute left-10 cursor-pointer top-4 text-lg text-white"
        onClick={() => navigate("/")}
      >
        Go Back
      </div>
      <div id="game-container" />
    </>
  );
}
