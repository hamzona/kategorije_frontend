import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Timer() {
  const [seconds, setSeconds] = useState(15);
  const socket = useSocket();

  useEffect(() => {
    socket.on("timer-update", ({ seconds }) => {
      console.log(seconds);
      setSeconds(seconds);
    });
  }, [socket]);

  return (
    <CircularProgressbar
      styles={buildStyles({
        pathColor: `rgba(${(255 / 15) * (15 - seconds)}, ${
          (255 / 15) * seconds
        }, 0)`,
        textColor: "black",
      })}
      value={(seconds / 15) * 100}
      text={`${seconds} s`}
    />
  );
}
