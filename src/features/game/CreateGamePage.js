import React, { useEffect, useRef } from "react";
import { useCreateGameMutation } from "./gameApiSlice";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function CreateGamePage() {
  const [createGame] = useCreateGameMutation();

  const gameName = useRef("");
  const usersNumber = useRef(null);

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  async function hendleSubmit(e) {
    e.preventDefault();
    try {
      // if (usersNumber.current.value < 2 || usersNumber.current.value > 6)
      //   return;
      const result = await createGame({
        usersNumber: usersNumber.current.value,
        creator: user,
      });
      console.log(result);
      if (result.data) {
        navigate(`/game/${result.data.socketID}`);
      }
      gameName.current.value = "";
      usersNumber.current.value = null;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <h1>Create game</h1>

      <Form onSubmit={hendleSubmit} className="border p-4 rounded">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of players</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of players"
            ref={usersNumber}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
