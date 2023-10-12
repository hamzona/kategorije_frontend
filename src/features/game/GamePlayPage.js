import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDataMutation } from "./gameApiSlice";
import Timer from "../../components/Timer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";

export default function GamePlayPage() {
  const socket = useSocket();

  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
    socket.on("update-game-data", ({ data }) => {
      setCategory(data?.category?.name);
      setUsers(data?.users);
      setCurrentUser(data?.users[data?.currentUserIndex]);
      setCoverdWords(data?.coverdWords);
      localStorage.removeItem("timerSeconds");
      //console.log(data.users[data.currentUserIndex] === user);
      /*  if (data.users[data.currentUserIndex].username === user) {
        input.current.focus();
      }*/
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
        setCategory(d?.category?.name);
        setUsers(d.users);
        setCurrentUser(d?.users[d?.currentUserIndex]);
        setCoverdWords(d?.coverdWords);

        // console.log(d.users[d.currentUserIndex]);
        // console.log(d.users[d.currentUserIndex].username === user);
        /*if (d.users[d.currentUserIndex].username === user) {
          console.log(input.current);
          input.current.focus();
        }*/
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
    if (!socket) return;
    socket.emit("try", { input: input.current.value, socketID: id });

    input.current.value = "";
  }
  const user = useSelector(selectCurrentUser);
  // console.log(currentUser?.username);

  // console.log(user);
  // console.log(currentUser?.username !== user);
  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "5vh" }}
    >
      <Row>
        <Col>
          <h2>Category: {category}</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {currentUser?.username === user ? (
            <Timer currentUser={currentUser} />
          ) : null}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div
            className="d-flex flex-wrap border p-3 rounded"
            style={{
              maxWidth: "600px",
              minWidth: "200px",
              minHeight: "50px",
              background: "#eeeeee",
            }}
          >
            {coverdWords &&
              coverdWords.map((item) => {
                const i = item.charAt(0).toUpperCase() + item.slice(1);
                return (
                  <div
                    className="border p-2 font-weight-bold rounded m-2"
                    style={{ background: "white" }}
                    key={item}
                  >
                    <s>{i}</s>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>

      <Row className="mt-4 ">
        <Col>
          <h1 className="mb-4">
            It's
            {currentUser?.username !== user
              ? ` ${currentUser?.username}'s `
              : " your "}
            turn
          </h1>
          <div>
            <Form onSubmit={hendleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <InputGroup>
                  <Form.Control
                    autoFocus={true}
                    type="text"
                    placeholder="Enter word"
                    ref={input}
                    disabled={currentUser?.username !== user}
                  />
                  <Button type="submit">Submit</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      {youWin ? (
        <div style={{ color: "green", fontSize: "4vw" }}>You win</div>
      ) : (
        <>
          {" "}
          <Row className="mt-3">
            <Col>
              <h3>Users Remaining:</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {users.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    style={{
                      color: `${item.username === user ? "red" : "black"}`,
                    }}
                    className="m-2"
                  >
                    {item.username}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
      {/* <Row className="mt-4">
        <Col>
          <Button
            variant="danger"
            onClick={() => {
              if (!socket) return;
              socket.emit("lose-game", { socketID: id, user });
            }}
          >
            Leave Game
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
}
