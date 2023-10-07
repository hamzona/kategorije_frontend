import React, { useEffect } from "react";
import GameList from "../features/game/GameList";
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const socket = useSocket();
  useEffect(() => {
    socket.removeAllListeners("timer-update");
  }, [socket]);
  return (
    <div className="d-flex justify-content-center" style={{ width: "100vw" }}>
      <GameList />
    </div>
  );
}
