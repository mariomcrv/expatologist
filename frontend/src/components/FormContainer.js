import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
    // we extract the children from the props to load the content from it
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
            
        </Container>
    )
}

export default FormContainer
