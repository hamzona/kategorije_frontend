import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useFindGameMutation } from "./gameApiSlice";
import { useNavigate } from "react-router-dom";

export default function GamesMenu() {
  const [findGame] = useFindGameMutation();

  const navigate = useNavigate();
  async function handleClick(usersNumber) {
    try {
      const result = await findGame({ usersNumber });

      console.log(result.data);
      if (result.data) {
        navigate(`game/${result.data.socketID}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const usersNumber = useRef(null);
  const IDref = useRef(null);
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center flex-wrap"
      style={{ height: "90vh" }}
    >
      <Row className="m-3">
        <Col>
          <h3>Join in random new game</h3>

          <Form
            className="border p-3 rounded"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                usersNumber.current.value !== null &&
                usersNumber.current.value > 0 &&
                usersNumber.current.value < 10
              ) {
                handleClick(usersNumber.current.value);
              }
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number of players</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of players"
                ref={usersNumber}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Join
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <h3>Join in private game</h3>

          <Form
            className="border p-3 rounded "
            onSubmit={(e) => {
              e.preventDefault();
              if (IDref.current.value !== null) {
                navigate(`/game/${IDref.current.value}`);
              }
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter ID</Form.Label>
              <Form.Control type="string" placeholder="Enter ID" ref={IDref} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Join
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
