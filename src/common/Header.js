import React from 'react'
import { Jumbotron } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

function Header(){
    return (
        <Jumbotron fluid>
            <Container>
                <h1>New York City Property Dashboard and Sales Prediction</h1>
                <p>
                .edit. Add some text here that describes the objective of the website .edit.
                </p>
            </Container>
        </Jumbotron>
    )
}

export default Header