import React from "react";
import GamesMenu from "../features/game/GamesMenu";

export default function Home() {
  return (
    <div className="d-flex justify-content-center" style={{ width: "100vw" }}>
      <GamesMenu />
    </div>
  );
}
