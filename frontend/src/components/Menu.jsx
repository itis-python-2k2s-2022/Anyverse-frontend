import React from 'react';
import { Nav, NavDropdown } from "react-bootstrap";


export default function MenuElement() {

  return (
    <Nav>
      <NavDropdown id={'nav-dropdown-menu'} title={'Меню'}>
          <NavDropdown.Item active>Друзья</NavDropdown.Item>
          <NavDropdown.Item >Чаты</NavDropdown.Item>
          <NavDropdown.Item >Категории</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >Выйти</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};
