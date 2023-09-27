import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavbarPage() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Kategorije</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/createGame">Create game</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
