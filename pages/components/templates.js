import { Container, Navbar, ListGroup, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import Image from 'next/image';
import throttle, { searchUpdate, manualSearch, closeDetails } from '@/components/helpers.js';
import { useState } from 'react';

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
                    <Button variant="dark" onClick={throttle(manualSearch, 300)}>🔍</Button>
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

/**
 * ImageWithFallback
 * React component. Generates an image that has a generic fallback image should the remote image src retrival fail.
 * @param {*} props React properties [altTag: String (img alt tag), fallbackSrc: String (URL of generic movie poster image that will display if poster lookup fails)]
 * @returns <ImageWithFallback> React object
 */
export const ImageWithFallback = (props) => 
{
    const { src, fallbackSrc, altTag, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc} 
            alt={altTag}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};