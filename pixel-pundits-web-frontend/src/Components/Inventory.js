import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow';
import { useState } from 'react';
import { deleteDBCard } from './CardDatabaseControl';

/*eslint-disable*/

export default function Inventory({ cards, helperFunction}) {

    return (
        <Container>
            {cards.map((card, index) => ( // Use .map instead of .forEach
                <Container key={index}> {/* Add a unique key prop here */}
                    <CardDisplayRow card={card} />
                    <Col>
                        <Button onClick={() => deleteDBCard(card.cardId, helperFunction())}> Remove Card </Button>
                    </Col>
                </Container>
            ))}
        </Container>
    )
}