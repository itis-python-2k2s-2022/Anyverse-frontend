import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {fetchToken} from "./Auth";
import MenuElement from "./Menu";


export default function NavbarElement() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">AnyVerse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">

            {fetchToken() ? (
                <>
                <MenuElement />
                <Nav.Link href="/profile/get_profile_info">Профиль</Nav.Link>
                </>
            ) : (
                <>
                <Nav.Link href="/auth/login">Вход</Nav.Link>
                <Nav.Link href="/auth/register">Регистрация</Nav.Link>
                </>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
</Navbar>
  );
}