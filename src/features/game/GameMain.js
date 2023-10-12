import React, { useEffect, Component, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDataMutation } from "./gameApiSlice";
import { useSocket } from "../../context/SocketProvider";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import GamePlayPage from "./GamePlayPage";
import GameLoby from "./GameLoby";
import { useLocation } from "react-router-dom";

export default function GameMain() {
  const { id } = useParams();
  const socket = useSocket();
  const user = useSelector(selectCurrentUser);
  const [isGamePlaying, setIsGamePlaying] = useState(false);

  useEffect(() => {
    if (socket == null) {
    } else {
      socket.emit("join-user", { socketID: id, user });
    }
    return function () {
      socket.emit("leave-room", { socketID: id, user });
    };
  }, []);

  return isGamePlaying ? (
    <GamePlayPage setIsGamePlaying={setIsGamePlaying} />
  ) : (
    <GameLoby setIsGamePlaying={setIsGamePlaying} />
  );
}
