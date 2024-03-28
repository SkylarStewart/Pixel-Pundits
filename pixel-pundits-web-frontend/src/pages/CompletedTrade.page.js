import React from 'react'
import {Row, Col, Container, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

export default function CompletedTrade () {

    let navigate = useNavigate();
    
    return (
        <Container>
            <h1>Trade Complete!</h1>
            <p>we sent you an e-mail with confirmation information.</p>
            <p>we also sent the user an e-mail notifiying them of your request.</p>
            <Button onClick = {() => {navigate('/')}}>Go Home</Button>
        </Container>
    ) 
}