import React, { useEffect } from "react";
import { Row, Col, Container, Figure } from "react-bootstrap";
import { CardObj } from "../TypeSheet";

const CardDisplayRow = ({ card }: { card: CardObj }) => {
    useEffect(() => {
        // Update the document title using the browser API
        //console.log(card);
    });

    return (
        <Container>
            <Figure>
                <Figure.Image src={card.imageURL} alt={card.name}/>
                <Figure.Caption>
                    <Row>Name: {card.name}</Row>
                    <Row>Set: {card.set}</Row>
                    <Row>Price: ${card.price}</Row>
                    <Row>Printing: {card.print}</Row>
                </Figure.Caption>
            </Figure>
            {/* <Row>
                <Col>
                    <img src={card.imageURL} alt={card.name} />
                </Col>
                <Col>
                    <br /><br />
                    <Row>Card Information:</Row>
                    <Row>Name: {card.name}</Row>
                    <Row>Set: {card.set}</Row>
                    <Row>Price: ${card.price}</Row>
                    <Row>Printing: {card.print}</Row>
                </Col>
            </Row> */}
        </Container>
    );
}


export default CardDisplayRow;