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
      socket.emit("join-user", { id, user });
    }
  }, []);

  useEffect(() => {
    /*if (!socket) {
    } else {
      socket.emit("rejoin-user", { socketID: id });
    }*/

    return function () {
      socket.emit("leave-room", { socketID: id, user });
    };
  }, [socket]);

  return isGamePlaying ? (
    <GamePlayPage setIsGamePlaying={setIsGamePlaying} />
  ) : (
    <GameLoby setIsGamePlaying={setIsGamePlaying} />
  );
}
