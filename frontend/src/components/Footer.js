import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py3'>Copyright &copy; Expatologist 2XXX</Col>
        </Row>
        <Row>
        <Col className='text-center py3'>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-linkedin-in"></i>
        </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
