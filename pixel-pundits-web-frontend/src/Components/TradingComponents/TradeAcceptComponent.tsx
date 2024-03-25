import React, { useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Trade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsAccepter } from '../TradeDatabaseControl';
import { getDBCard } from '../CardDatabaseControl';

export default function TradeAcceptComponent({ trade }: { trade: Trade }) {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <Row>
                <Col>
                    <p>TRADE WITH ID: {trade._id}</p> {/* Assuming you meant to display trade._id here */}
                </Col>
                <Col>
                    <Row>Trade Initializer: {trade.tradeMaker}</Row>
                    <Row>Their Cards:</Row>
                    <Row>
                        {trade.tradeMakerCards.map((card, index) => (
                            <Container key={index}>
                                <p>{card}</p>
                            </Container>
                        ))}
                    </Row>
                    <Row>Your Cards:</Row>
                    <Row>
                        {trade.tradeAccepterCards.map((card, index) => (
                            <Container key={index}>
                                <p>{card}</p>
                            </Container>
                        ))}
                    </Row>
                    <Row>Accept Trade?</Row>
                    {trade.acceptStatus ? (
                        <Button onClick={() => confirmTradeAsAccepter(user, trade._id)}>Confirm Trade</Button>
                    ) : (
                        <>
                            <Button onClick={() => updateAcceptStatus(user, trade._id)}>Accept Trade</Button>
                            <Button onClick={() => deleteTrade(user, trade._id)}>Decline Trade</Button>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
