import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDataMutation } from "./gameApiSlice";
import { useSocketID } from "../../context/SocketIDProvider";
import { useSocket } from "../../context/SocketProvider";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import GamePlayPage from "./GamePlayPage";
import GameLoby from "./GameLoby";
import { io } from "socket.io-client";

export default function GameBar() {
  const { id } = useParams();
  const socket = useSocket();
  const user = useSelector(selectCurrentUser);
  const [isGameStart, setIsGameStart] = useState(false);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("join-user", { id });
    return () => {
      socket.emit("leave-room", { socketID: id, user });
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("rejoin-user", { socketID: id });
    socket.on("win", () => {
      console.log("you win");
    });
  }, [socket]);

  return isGameStart ? (
    <GamePlayPage />
  ) : (
    <GameLoby setIsGameStart={setIsGameStart} />
  );
}
