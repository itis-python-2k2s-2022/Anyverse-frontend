import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {fetchToken} from "./Auth";
import {useNavigate} from "react-router";


export default function NavbarElement() {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand href="/">AnyVerse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">

            {fetchToken() ? (
                <>
                <Nav>
                  <NavDropdown id={'nav-dropdown-menu'} title={'Меню'}>
                      <NavDropdown.Item href={"/chat/get_chats"}>Чаты</NavDropdown.Item>
                      <NavDropdown.Item href={"/category/subscriptions"}>Категории</NavDropdown.Item>
                      <NavDropdown.Item href={"/friendlist/get_friends"}>Друзья</NavDropdown.Item>
                      <NavDropdown.Item href={"/search_friend"}>Найти друзей</NavDropdown.Item>
                      <NavDropdown.Item href={"/recommended_friends"}>Возможные друзья</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={signOut}>Выйти</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
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