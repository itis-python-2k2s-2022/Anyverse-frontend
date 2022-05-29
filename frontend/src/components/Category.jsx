import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import {fetchToken} from "./Auth";
import {useLocation} from "react-router-dom";


export default function  Category() {
    const location = useLocation();
    const path = location.pathname;
    const pathPart = path.slice(1, 9);
    const check = fetchToken() && (pathPart === 'category');

    return (
        <>
            {check ? (
                <div>
                      <Navbar  bg="dark" variant="dark" expand="sm">
                      <Container>
                        <Navbar.Brand href="/category/subscriptions">Категории</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1">
                                    <Nav.Link href="/category/subscriptions">Подписки</Nav.Link>
                                    <Nav.Link href="/category/my_category">Мои категории</Nav.Link>
                                    <Nav.Link href="/category/recommended_categories">Рекоммендации</Nav.Link>
                                    <Nav.Link href="/category/create_category">Создать категорию</Nav.Link>
                                    <Nav.Link href="/category/search">Поиск по категориям</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                </div>
            ) : (
            <></>
                )}
        </>
    );
};
