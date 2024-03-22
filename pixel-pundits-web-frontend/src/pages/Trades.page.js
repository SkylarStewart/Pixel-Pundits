import { useEffect, useState, useContext, React } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CardObj } from "../TypeSheet";
import {navigate, useNavigate} from 'react-router-dom'

//TEST PAGE for showing that the trade mechanic works as intended.=
export default function Trades() {

    return (

        <>
            <Container>
                <h1>Outgoing Offers</h1>
            </Container>
            <Container>
                <h1>Incoming Offers</h1>
            </Container>
            <Container>
                <h1>Accepted Trades</h1>
            </Container>
            <Container>
                <h1>Completed Trades</h1>
            </Container>
        </>
    );
}

