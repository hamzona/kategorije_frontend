import React from "react";
import GameList from "../features/game/GameList";

export default function Home() {
  return (
    <div className="d-flex justify-content-center" style={{ width: "100vw" }}>
      <GameList />
    </div>
  );
}
