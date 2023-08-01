import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { Context as GameContext } from "../context/GameContext";

export default function Leaderboard() {
  const [scoreList, setScoreList] = useState([]);
  const { getScores, state } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    getScores();
  }, []);

  useEffect(() => {
    setScoreList(state.scores);
  }, [state.scores]);

  const updateScoreList = useCallback((newScore) => {
    setScoreList((prev) => {
      const newScoreList = [...prev, newScore];
      newScoreList.sort((a, b) => b.score - a.score);
      if (newScoreList.length > 100) {
        newScoreList.pop();
      }
      return newScoreList;
    });
  }, []);

  useEffect(() => {
    const socket = io();
    socket.on("score-added", (newScore) => {
      console.log(22222, "newScore", newScore);
      updateScoreList(newScore);
    });
    return () => {
      socket.disconnect();
    };
  }, [updateScoreList]);

  return (
    <div className="max-w-md min-w-min mx-auto flex flex-col h-screen py-4">
      <div className="relative mb-4 flex justify-center items-center">
        <div
          className="absolute left-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go Back
        </div>
        <h1 className=" text-2xl text-center">Leaderboard</h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td className="px-6 py-3">No</td>
              <th scope="row" className="px-6 py-3">
                Name
              </th>
              <th className="px-6 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreList.map(({ name, score }, index) => (
              <tr
                className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                key={`row_${index}`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
