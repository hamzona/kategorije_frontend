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
      setGameStartTimer(true);
      setTimeout(() => {}, 5000);
      //socket.emit("gameplay-start", { socketID: id });
    });

    socket.on("update-user", ({ user, usersNumber }) => {
      if (usersNumber.length !== gamePlayersNumber) {
        setGameStartTimer(false);
      }
      setCurrentUsresNumber(usersNumber);
    });
  }, [socket]);

  const [getData] = useGetDataMutation();
  useEffect(() => {
    async function a() {
      try {
        const result = await getData({ id });

        if (result?.data) {
          setCurrentUsresNumber(result.data.users);
          setGamePlayersNumber(result.data.usersNumber);
          setTimeout(() => {
            setIsGamePlaying(result.data.isGamePlaying);
          }, 5000);
        }
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
    a();
  }, []);
  const [gameStartTimer, setGameStartTimer] = useState(false);
  const [currentUsersNumber, setCurrentUsresNumber] = useState([]);
  const [gamePlayersNumber, setGamePlayersNumber] = useState(null);

  console.log(currentUsersNumber);

  let gamePlayersArray = [];

  for (let i = 0; i < gamePlayersNumber; i++) {
    gamePlayersArray.push(null);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="m-4">Game Loby</h1>
      {gameStartTimer ? (
        <GameStartsTimer setIsGamePlaying={setIsGamePlaying(true)} />
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ margin: "5rem" }}
        >
          <SpinerAnimation />
          <div className="m-3">Waiting for players...</div>
        </div>
      )}
      <div className="d-flex flex-row justify-content-center align-items-center m-3">
        {gamePlayersArray.map((_, index) => {
          return (
            <div>
              {currentUsersNumber[index] ? (
                <Card
                  key={index}
                  style={{ width: "18rem" }}
                  className="d-flex justify-content-center align-items-center m-3"
                >
                  <Card.Body>
                    <Card.Title>
                      {currentUsersNumber[index].username}
                    </Card.Title>
                  </Card.Body>
                </Card>
              ) : (
                <div
                  style={{ width: "18rem", fontSize: "2rem" }}
                  className="border-bottom border-dark text-center"
                >
                  Player {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
