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
      setWrongExamples(data?.wrongExamples);
      localStorage.removeItem("timerSeconds");
    });
    socket.on("win", () => {
      console.log("WIN");
      setYouWin(true);
    });
    socket.on("redirect", ({ user: a }) => {
      console.log(a);
      if (a === user) {
        navigate("/");
      }
    });

    socket.on("wrong-try", ({ wrongExamples: a }) => {
      console.log("wrong-try", a);
      setWrongExamples(a);
      //setValidated(false);
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
        setYouWin(d?.win);
      }
    }
    a();
  }, []);

  const input = useRef("");

  const [category, setCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [coverdWords, setCoverdWords] = useState([]);
  const [wrongExamples, setWrongExamples] = useState([]);
  const [youWin, setYouWin] = useState(false);

  async function hendleSubmit(e) {
    e.preventDefault();
    if (!socket) return;
    socket.emit("try", { input: input.current.value.trim(), socketID: id });

    input.current.value = "";
  }
  const user = useSelector(selectCurrentUser);

  //const [validated, setValidated] = useState(true);

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
      {youWin ? null : (
        <Row className="mt-4">
          <Col>
            <Timer currentUser={currentUser} />
          </Col>
        </Row>
      )}
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

      {youWin ? (
        <h1 style={{ color: "green" }}>You win</h1>
      ) : (
        <>
          <Row className="mt-4 ">
            <Col>
              <h1 className="mb-4">
                {currentUser?.username !== user
                  ? `${currentUser?.username} `
                  : "You "}
                play
              </h1>
              <div>
                <Form /*validated={validated}*/ onSubmit={hendleSubmit}>
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
              <div>
                {" "}
                {wrongExamples.map((item, index) => {
                  return <div key={index}>{item}</div>;
                })}
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <h3>Users Remaining:</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              {users.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: `${
                      item.username === currentUser.username ? "red" : "white"
                    }`,
                    color: `${
                      item.username === currentUser.username ? "white" : "black"
                    }`,
                    fontWeight: `${
                      item.username === currentUser.username ? "bold" : ""
                    }`,
                  }}
                  className="m-2 p-2 border border-dark rounded"
                >
                  {item.username}
                </div>
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
