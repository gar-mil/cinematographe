import { Container, Navbar, ListGroup } from 'react-bootstrap';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

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
