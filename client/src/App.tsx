import React from 'react';
import './App.css';
import { Badge, Container, Row } from 'react-bootstrap';
import Movies from './components/Movies/Movies';

function App() {
  return (
    <Container>
      <Row className='text-center'>
        <h1>
          <Badge bg="secondary">Mflix - Express + React + Mongo</Badge>
        </h1>
      </Row>
      <Movies />
    </Container>
  );
}

export default App;
