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
          <Col>
            <ButtonToolbar className="mb-5" aria-label="Toolbar with Button groups">
              <InputGroup hasValidation>
                <FloatingLabel label="Search">
                    <Form.Control className="border-radius-left-only" type="text" placeholder="Search..." id="searchBox" onInput={throttle(searchUpdate,300)} />
                </FloatingLabel>
                <Button variant="primary" onClick={manualSearch}>🔍</Button>
              </InputGroup>
            </ButtonToolbar>
          </Col>
        </Row>
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

