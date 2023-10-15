import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useGetDataMutation } from "./gameApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SpinerAnimation from "../../components/SpinerAnimation";
import GameStartsTimer from "../../components/GameStartsTimer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function GameLoby({ setIsGamePlaying }) {
  const { id } = useParams();
  const socket = useSocket();
  useEffect(() => {
    console.log(socket);
    if (!socket) return;

    socket.on("update-loby", ({ data }) => {
      console.log("update-loby");
      console.log(data);
      setCurrentUsers(data.users);
      setGamePlayersNumber(data.usersNumber);
      setIsGamePlaying(data.isGamePlaying);
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
        }
        console.log(result);
        if (!result.data) {
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
    a();
  }, []);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [gamePlayersNumber, setGamePlayersNumber] = useState(null);

  let gamePlayersArray = [];

  for (let i = 0; i < gamePlayersNumber; i++) {
    gamePlayersArray.push(null);
  }
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="p-4">ID : {id}</h1>

      <Row
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ padding: "5rem" }}
      >
        <SpinerAnimation />
        <div className="m-3">Waiting for players...</div>
      </Row>

      <Row className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
        {gamePlayersArray.map((_, index) => (
          <Col key={index} style={{ maxWidth: "130px" }}>
            {!currentUsers[index]?.username ? (
              <div
                style={{ fontSize: "2rem" }}
                className="border-bottom border-dark text-center"
              >
                Player {index + 1}
              </div>
            ) : (
              <Card style={{ width: "100%" }}>
                <Card.Body className="d-flex justify-content-center align-items-center m-3">
                  <Card.Title>{currentUsers[index].username}</Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col>
          <Button
            variant="danger"
            onClick={() => {
              if (!socket) return;
              navigate("/");
              socket.emit("lose-game", { socketID: id, user });
            }}
          >
            Leave Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
