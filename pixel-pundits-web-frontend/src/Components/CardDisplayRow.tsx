import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import { CardObj } from "../TypeSheet";

const CardDisplayRow = ({ card }: { card: CardObj }) =>{
    return (
        <Container>
            <Row>
                <Col>
                    <img src={card.imageUrl} alt={card.name} />
                </Col>
                <Col>
                    <Row>Name: {card.name}</Row>
                    <Row>Set: {card.set}</Row>
                    <Row>Price: ${card.price}</Row>
                    <Row>Printing: {card.print}</Row>
                </Col>
            </Row>    
        </Container>
      );
}


export default CardDisplayRow;