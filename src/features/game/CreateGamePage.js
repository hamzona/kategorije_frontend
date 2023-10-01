import React, { useEffect, useRef } from "react";
import { useCreateGameMutation } from "./gameApiSlice";
import { Button, Form } from "react-bootstrap";

export default function CreateGamePage() {
  const [createGame] = useCreateGameMutation();

  const gameName = useRef("");
  const usersNumber = useRef(null);
  async function hendleSubmit(e) {
    e.preventDefault();
    try {
      // if (usersNumber.current.value < 2 || usersNumber.current.value > 6)
      //   return;
      const result = await createGame({
        name: gameName.current.value,
        usersNumber: usersNumber.current.value,
      });
      console.log(result);
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
          <Form.Label>Game name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter game name"
            ref={gameName}
          />
        </Form.Group>
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
      {/* <form onSubmit={hendleSubmit}>
        <input type="text" ref={gameName} />
        <input type="number" ref={usersNumber} />
        <button type="submit">submit</button>
      </form> */}
    </div>
  );
}
