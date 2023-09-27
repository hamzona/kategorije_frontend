import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useSocketID } from "../../context/SocketIDProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDataMutation } from "./gameApiSlice";
import Timer from "../../components/Timer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function GamePlayPage() {
  const socket = useSocket();

  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
    socket.on("update-game-data", ({ data }) => {
      setCategory(data.category.name);
      setUsers(data.users);
      setCurrentUser(data.users[data.currentUserIndex]);
      setCoverdWords(data.coverdWords);
      localStorage.removeItem("timerSeconds");
    });

    socket.on("redirect", () => {
      navigate("/");
    });

    socket.on("win", () => {
      setYouWin(true);
    });
  }, [socket]);

  const { id } = useParams();

  const [getData] = useGetDataMutation();

  useEffect(() => {
    async function a() {
      const data = await getData({ id });
      if (data?.data) {
        const d = data.data;
        console.log(d);
        setCategory(d.category.name);
        setUsers(d.users);
        setCurrentUser(d.users[d.currentUserIndex]);
        setCoverdWords(d.coverdWords);
      }
    }
    a();
  }, []);

  const input = useRef("");

  const [category, setCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [coverdWords, setCoverdWords] = useState([]);
  const [youWin, setYouWin] = useState(false);

  async function hendleSubmit(e) {
    e.preventDefault();
    console.log(socket);
    if (!socket) return;
    socket.emit("try", { input: input.current.value, socketID: id });

    input.current.value = "";
  }
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      GamePlayPage
      <div>{category}</div>
      <div>
        {users.map((user) => {
          return <div key={user._id}>{user.username}</div>;
        })}
      </div>
      <div>current user: {currentUser?.username}</div>
      <div>
        {coverdWords &&
          coverdWords.map((item) => {
            const i = item.charAt(0).toUpperCase() + item.slice(1);
            return <div key={item}>{i}</div>;
          })}
      </div>
      {currentUser?.username === user ? (
        <div>
          {" "}
          <Timer currentUser={currentUser} />{" "}
          <form onSubmit={hendleSubmit}>
            <input type="text" ref={input} />
            <button type="submit">submit</button>
          </form>
        </div>
      ) : null}{" "}
      <button
        onClick={() => {
          if (!socket) return;
          socket.emit("lose-game", { socketID: id, user });
        }}
      >
        Leave game
      </button>
      {youWin ? "You win" : null}
    </div>
  );
}
