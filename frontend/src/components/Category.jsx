import React from 'react';
import axios from "axios";
import { Navbar, Nav, Container} from 'react-bootstrap';
import {fetchToken} from "./Auth";


export default function  Category() {

    return (
        <div>
              <Navbar  bg="dark" variant="dark" expand="sm">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav pullRight className="me-auto">
                        <Nav.Link href="/category/subscriptions">Подписки</Nav.Link>
                    </Nav>
                    <Nav pullRight className="me-auto">
                        <Nav.Link href="/category/my_category">Мои категории</Nav.Link>
                    </Nav>
                    <Nav pullRight className="me-auto">
                        <Nav.Link href="/category/recommended_categories">Рекоммендации</Nav.Link>
                    </Nav>
                    <Nav pullRight className="me-auto">
                        <Nav.Link href="/category/create_category">Создать категорию</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    );
};
