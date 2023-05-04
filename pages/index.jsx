import { Container, Row, Col, Form, Button, FloatingLabel, ButtonToolbar, InputGroup } from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { searchUpdate, throttle, manualSearch } from '@/components/helpers.js';
import { NavSection, ListRoot } from '@/components/templates.js';
import { useContext, createContext } from 'react';

export default function Index() 
{
  return (
    <Container>
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
        <NavSection/>
        <br />
        <Row>
          <Col id="errorDisplay"></Col>
        </Row>
        <Row>
          <Col>
            <ListRoot/>
          </Col>
        </Row>
      </ThemeProvider>
    </Container>
  );
}

