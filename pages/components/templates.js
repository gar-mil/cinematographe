import { Container, Navbar, ListGroup, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import throttle, { searchUpdate, manualSearch, closeDetails } from '@/components/helpers.js';

/**
 * NavBar at top of page.
 * @returns React component
 */
export default function NavSection()
{
    return (
        <>
            <Navbar variant="secondary">
            <Container>
                <Navbar.Brand>
                <Image
                    alt=""
                    src="/cinematographeLogo.webp"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Cinématographe
                </Navbar.Brand>
                <ButtonToolbar id="searchBar">
                    <InputGroup hasValidation>
                    <FloatingLabel label="Search">
                        <Form.Control className="border-radius-left-only" type="text" placeholder="Search..." id="searchBox" onInput={throttle(searchUpdate,300)} />
                    </FloatingLabel>
                    <Button variant="dark" onClick={manualSearch}>🔍</Button>
                    </InputGroup>
                </ButtonToolbar>
                <ButtonToolbar id="detailsButton" className='no-display'>
                    <Button variant="dark" onClick={closeDetails}>Close Details</Button>
                </ButtonToolbar>
            </Container>
            </Navbar>
        </>
    )
}

/**
 * Lists of search results and movie details.
 * @returns  React component
 */
export function ListRoot()
{
    return (
        <>
            <ListGroup variant="flush" id="searchResults" className="innerContainer-bg"/>
            <ListGroup variant="flush" id="detailsResults" className="no-display"/>
        </>
    )
}
