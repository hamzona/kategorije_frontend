import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarPage() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            Kategorije
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/createGame"
          >
            Create game
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
