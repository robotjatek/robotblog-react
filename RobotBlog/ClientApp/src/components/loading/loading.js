import React from 'reactn';
import './bt-spinner.css';
import { Container, Row, Col } from 'react-bootstrap';

const Loading = () => (
  <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        <div className="bt-spinner" />
      </Col>
    </Row>
  </Container>
);

export default Loading;
