import React from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function CompletedTrade() {

    let navigate = useNavigate();

    return (
        <div className="body-background-freeform">
            <Container style={{ minHeight: '87vh', paddingTop: "40px" }}>
                <Container className="d-flex flex-column align-items-center" style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)"
                }}>
                    <h1>Trade Complete!</h1>
                    <p>we sent you an e-mail with confirmation information.</p>
                    <p>we also sent the user an e-mail notifiying them of your request.</p>
                    <Button variant = "dark" onClick={() => { navigate('/') }}>Go Home</Button>
                </Container>
            </Container>
            <Footer></Footer>
        </div>
    )
}