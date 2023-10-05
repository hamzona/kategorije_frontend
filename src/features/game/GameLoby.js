import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useGetDataMutation } from "./gameApiSlice";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import SpinerAnimation from "../../components/SpinerAnimation";
import GameStartsTimer from "../../components/GameStartsTimer";

export default function GameLoby({ setIsGamePlaying }) {
  const { id } = useParams();
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;

    socket.on("game-start", () => {
      setIsGamePlaying(true);
      localStorage.removeItem("timerSeconds");
    });

    socket.on("update-user", ({ users, usersNumber }) => {
      /*if (users !== usersNumber) {
        setGameStartTimer(false);
      }*/

      setCurrentUsers(users);
      setGamePlayersNumber(usersNumber);
    });
  }, [socket]);

  const [getData] = useGetDataMutation();
  useEffect(() => {
    async function a() {
      try {
        const result = await getData({ id });

        if (result?.data) {
          setCurrentUsers(result.data.users);
          setGamePlayersNumber(result.data.usersNumber);
          setIsGamePlaying(result.data.isGamePlaying);
          if (result.data.usersNumber.length === result.data.users.length) {
            // setGameStartTimer(true);
          }
        }
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
    a();
  }, []);
  const [gameStartTimer, setGameStartTimer] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [gamePlayersNumber, setGamePlayersNumber] = useState(null);

  let gamePlayersArray = [];

  for (let i = 0; i < gamePlayersNumber; i++) {
    gamePlayersArray.push(null);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="p-4">Game Loby</h1>
      {/* {gameStartTimer ? (
        <GameStartsTimer setIsGamePlaying={setIsGamePlaying} />
      ) : ( */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ padding: "5rem" }}
      >
        <SpinerAnimation />
        <div className="m-3">Waiting for players...</div>
      </div>

      <div className="d-flex flex-row justify-content-center align-items-center p-3">
        {gamePlayersArray.map((_, index) => {
          return (
            <div key={index}>
              {!currentUsers[index]?.username ? (
                <div
                  style={{ width: "18rem", fontSize: "2rem", margin: "0 1rem" }}
                  className="border-bottom border-dark text-center"
                >
                  Player {index + 1}
                </div>
              ) : (
                <Card
                  style={{ width: "15vw" }}
                  className="d-flex justify-content-center align-items-center m-3"
                >
                  <Card.Body>
                    <Card.Title>{currentUsers[index].username}</Card.Title>
                  </Card.Body>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
