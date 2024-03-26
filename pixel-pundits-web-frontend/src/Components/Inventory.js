import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow';
import { useState, React } from 'react';
import { deleteDBCard } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';

/*eslint-disable*/

export default function Inventory({ cards, helperFunction}) {

    const {user} = useContext(UserContext)

    const style = {
        paddingTop: '1rem',
        //paddingBottom: '1rem',
    };

    return (
        <Container>
            {cards.map((card, index) => ( // Use .map instead of .forEach
                <div key={card.cardId} style={style}>
                    <Container key={index}> {/* Add a unique key prop here */}
                        <Row className="justify-content-center">
                            <Col><CardDisplayRow card={card} /></Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} className="d-flex align-items-center justify-content-center">
                                <Button onClick={() => deleteDBCard(user, card.cardId, helperFunction)}> Remove Card </Button>
                            </Col>
                        </Row>
                        <hr/>
                    </Container>
                </div>
            ))}
        </Container>
    )
}