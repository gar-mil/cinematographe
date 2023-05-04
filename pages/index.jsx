import { Container, Row, Col, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { NavSection, ListRoot } from '@/components/templates.js';

export default function Index() 
{
  return (
    <>
    <NavSection/>
    <Container className="no-padding">
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <Container className="innerContainer innerContainer-bg no-padding vh100">
          <Row>
            <Col className="introCol">
              <p><strong>Cinématographe</strong> is a React/Nextjs/GraphQL application that consumes the <a href="https://www.omdbapi.com/" target='_blank'>OMDb API</a> and displays information to the user about movies that they have searched for.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListRoot/>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
      <footer className="footerC" />
    </Container>
    </>
  );
}

