import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Trade } from '../../TypeSheet';
import CardDisplayRow from '../CardDisplayRow';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { updateAcceptStatus } from '../TradeDatabaseControl';
import { deleteTrade } from '../TradeDatabaseControl';

export default function TradeAcceptComponent({ trade }: { trade: Trade }) {

    //user context
    const { user } = useContext(UserContext)


    return (
        <Container>
            <Row>
                <Col>
                    <p>TRADE WITH ID: {trade.tradeMaker}</p>
                </Col>
                <Col>
                    <Row>Trade Initializer: {trade.tradeMaker}</Row>
                    <Row>Their Cards:  </Row>
                    <Row>
                        {trade.tradeMakerCards.map((card, index) => ( // Use .map instead of .forEach
                            <Container key={index}> {/* Add a unique key prop here */}
                                <p>{card}</p>
                            </Container>
                        ))}</Row>
                    <Row>Your Cards: </Row>
                    <Row>
                        {trade.tradeAccepterCards.map((card, index) => ( // Use .map instead of .forEach
                            <Container key={index}> {/* Add a unique key prop here */}
                                <p>{card}</p>
                            </Container>
                        ))}</Row>
                    <Row>Accept Trade?</Row>
                    <Button onClick={() => updateAcceptStatus(user, trade._id)}>Accept Trade</Button>
                    <Button onClick={() => deleteTrade(user, trade._id)}>Decline Trade</Button>
                </Col>
            </Row>
        </Container>
    );
}