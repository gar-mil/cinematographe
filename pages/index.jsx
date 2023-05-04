import { Container, Row, Col, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { NavSection, ListRoot } from '@/components/templates.js';
import { useContext, createContext } from 'react';

export default function Index() 
{
  return (
    <>
    <NavSection/>
    <Container className="no-padding">
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <Container className="innerContainer innerContainer-bg no-padding vh100">
          <Row>
            <Col id="errorDisplay"></Col>
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

