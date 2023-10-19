import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

export default function NavbarPage() {
  const user = useSelector(selectCurrentUser);
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            Kategorije
          </Link>
        </Navbar.Brand>

        <Nav className="me-auto ">
          <Link
            style={{
              marginRight: "1rem",
              textDecoration: "none",
              color: "white",
            }}
            to="/createGame"
          >
            Create game
          </Link>
          <Link
            style={{
              marginRight: "1rem",
              textDecoration: "none",
              color: "white",
            }}
            to="/myGames"
          >
            My games{" "}
          </Link>
        </Nav>

        <Nav className="me-auto"></Nav>
        <Nav style={{ textDecoration: "none", color: "white" }}>
          user : {user}
        </Nav>
      </Container>
    </Navbar>
  );
}
