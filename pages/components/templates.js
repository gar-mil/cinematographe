import { Container, Navbar, ListGroup, Row, Col, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import { useState } from 'react';
import { searchUpdate, throttle, manualSearch } from '@/components/helpers.js';

export function NavSection()
{
    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                <Image
                    alt=""
                    src="/cinematographeLogo.webp"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Cinematographe
                </Navbar.Brand>
                <ButtonToolbar aria-label="Toolbar with Button groups">
                <InputGroup hasValidation>
                    <FloatingLabel label="Search">
                        <Form.Control className="border-radius-left-only" type="text" placeholder="Search..." id="searchBox" onInput={throttle(searchUpdate,300)} />
                    </FloatingLabel>
                    <Button variant="primary" onClick={manualSearch}>🔍</Button>
              </InputGroup>
            </ButtonToolbar>
            </Container>
            </Navbar>
        </>
    )
}

export function ListRoot()
{
    return (
        <ListGroup variant="flush" id="searchResults">

        </ListGroup>
    )
}
