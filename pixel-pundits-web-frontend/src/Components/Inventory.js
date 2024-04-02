import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow';
import { useState, React } from 'react';
import { deleteDBCard } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';

/*eslint-disable*/

export default function Inventory({ cards, helperFunction }) {

    const { user } = useContext(UserContext)

    const style = {
        paddingTop: '1rem',
        //paddingBottom: '1rem',
    };

    const elementsPerRow = 4;

    return (
        <Container>
            {cards.map((card, index) => (
                // Use modulus operator to determine when to start a new row
                index % elementsPerRow === 0 && (
                    <Row key={`row-${index}`} className="justify-content-center">
                        {cards.slice(index, index + elementsPerRow).map((card, subIndex) => (
                            <Col key={`col-${subIndex}`}>
                                <div key={card.cardId}>
                                    <CardDisplayRow card={card} />
                                    <Button onClick={() => deleteDBCard(user, card._id, helperFunction)}>Remove Card</Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )
            ))}
        </Container>
    )
}