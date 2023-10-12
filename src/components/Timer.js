import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Timer({ currentUser }) {
  const [seconds, setSeconds] = useState(30);
  const socket = useSocket();

  useEffect(() => {
    socket.on("timer-update", ({ seconds }) => {
      console.log(seconds);
      setSeconds(seconds);
    });
  }, [socket]);

  return (
    <CircularProgressbar value={(seconds / 30) * 100} text={`${seconds} s`} />
  );
}
