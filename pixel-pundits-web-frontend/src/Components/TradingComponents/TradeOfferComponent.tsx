import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Trade } from '../../TypeSheet';
import CardDisplayRow from '../CardDisplayRow';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { updateAcceptStatus } from '../TradeDatabaseControl';
import { deleteTrade } from '../TradeDatabaseControl';

export default function TradeOfferComponent({ trade }: { trade: Trade }) {

    //user context
    const { user } = useContext(UserContext)


    return (
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Row>Trade Initializer: {trade.tradeMaker}</Row>
                    <Row>Cards Being Offered: </Row>
                    <Row>
                        {trade.tradeMakerCards.map((card, index) => ( // Use .map instead of .forEach
                            <Container key={index}> {/* Add a unique key prop here */}
                                <p>{card}</p>
                            </Container>
                        ))}</Row>
                    <Row>Cards Being Asked for: </Row>
                    <Row>
                        {trade.tradeAccepterCards.map((card, index) => ( // Use .map instead of .forEach
                            <Container key={index}> {/* Add a unique key prop here */}
                                <p>{card}</p>
                            </Container>
                        ))}</Row>
                    <Button>Delete Trade</Button>
                </Col>
            </Row>
        </Container>
    );
}