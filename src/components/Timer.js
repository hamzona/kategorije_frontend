import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Timer({ currentUser }) {
  const [seconds, setSeconds] = useState(
    //localStorage.getItem("timerSeconds") ||
    30
  );
  const socket = useSocket();
  const { id } = useParams();

  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    socket.on("success", () => {
      // localStorage.setItem("timerSeconds", 30);
      setSeconds(30);
    });
    socket.on("timer-update", ({ seconds }) => {
      console.log(seconds);
      setSeconds(seconds);
    });
  }, [socket]);

  // // useEffect(() => {
  //localStorage.setItem("timerSeconds", seconds);
  // const timer = setInterval(() => {
  //   if (seconds > 0) {
  //     setSeconds(seconds - 1);
  //   } else {
  //     localStorage.removeItem("timerSeconds");
  //     socket.emit("lose-game", { socketID: id, user });
  //   }
  // }, 1000);
  // // return () => clearInterval(timer);
  // }, [seconds]);
  console.log(parseInt((30 / seconds) * 100));
  return (
    <CircularProgressbar
      value={parseInt((seconds / 30) * 100)}
      text={`${seconds}`}
    />
  );
}
