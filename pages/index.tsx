import Image from 'next/image'
import { getMediaGQL, getMediaListGQL } from '@/lib/gql'
import styles from '@/components/cine.module.css'
import Link from "next/link";
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

export default function Index() 
{
  return (
    <Container>
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Cinematographe
          </Navbar.Brand>
        </Container>
      </Navbar>
        <Row>
          <Col>
            <h1>Search</h1>
            <p>Placeholder text.</p>
            <button onClick={() => getMediaGQL('tt0120338')}>getMediaGQL</button>
                <button onClick={() => getMediaListGQL('Horse','1')}>getMediaListGQL</button>
                <pre id='getMediaGQLDiv'>
                </pre>
                <br />
                <pre id='getMediaListGQLDiv'>
                </pre>
          </Col>
        </Row>
      </ThemeProvider>
    </Container>
  );
}
