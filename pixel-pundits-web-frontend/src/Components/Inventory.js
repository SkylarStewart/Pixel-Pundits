import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow';
import { useState, React } from 'react';
import { deleteDBCard } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';

/*eslint-disable*/

export default function Inventory({ cards, helperFunction}) {

    const {user} = useContext(UserContext)


    return (
        <Container>
            {cards.map((card, index) => ( // Use .map instead of .forEach
                <Container key={index}> {/* Add a unique key prop here */}
                    <CardDisplayRow card={card} />
                    <Col>
                        <Button onClick={() => deleteDBCard(user, card.cardId, helperFunction)}> Remove Card </Button>
                    </Col>
                </Container>
            ))}
        </Container>
    )
}