import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import MainBoard from "./pages/MainBoard";
import { Provider as ContactContextProvider } from "./context/GameContext";

function App() {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainBoard />} />
          <Route exact path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  );
}

export default App;
