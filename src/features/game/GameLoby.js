import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useGetDataMutation } from "./gameApiSlice";
import { useParams } from "react-router-dom";

export default function GameLoby({ setIsGameStart }) {
  const { id } = useParams();
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;

    socket.on("game-start", ({ users }) => {
      setIsGameStart(true);
      socket.emit("gameplay-start", { socketID: id });
    });

    socket.on("update-user", ({ user, usersNumber }) => {
      setCurrentUsresNumber(usersNumber);
    });
  }, [socket]);

  const [getData] = useGetDataMutation();
  useEffect(() => {
    async function a() {
      try {
        const result = await getData({ id });

        if (result?.data) {
          setCurrentUsresNumber(result.data.users.length);
          setIsGameStart(result.data.isGamePlaying);
        }
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
    a();
  }, []);

  const [currentUsersNumber, setCurrentUsresNumber] = useState(0);

  return (
    <div>
      Game Loby
      {currentUsersNumber}
    </div>
  );
}
