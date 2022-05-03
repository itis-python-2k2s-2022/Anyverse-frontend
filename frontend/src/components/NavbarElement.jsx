import React from "react";
import { useState } from "react";
import { Navbar, Nav, Container} from 'react-bootstrap';


export default function NavbarElement() {

  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">AnyVerse</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/auth/login">Вход</Nav.Link>
        <Nav.Link href="/auth/register">Регистрация</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}