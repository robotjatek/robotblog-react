import React from "reactn";
import "./bt-spinner.css";
import { Container, Row, Col } from "react-bootstrap";

const Loading = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <div className="bt-spinner"></div>
                </Col>
            </Row>
        </Container >
    );
}

export default Loading;