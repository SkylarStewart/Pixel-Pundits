import React, { useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Trade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsMaker } from '../TradeDatabaseControl';

export default function TradeOfferComponent({ trade }: { trade: Trade }) {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <Row>
                <Col>
                    {/* Intentionally left blank or you can add content here if needed */}
                </Col>
                <Col>
                    <Row>Trade Initializer: {trade.tradeMaker}</Row>
                    <Row>Cards Being Offered: </Row>
                    <Row>
                        {trade.tradeMakerCards.map((card, index) => (
                            <Container key={index}>
                                <p>{card}</p>
                            </Container>
                        ))}
                    </Row>
                    <Row>Cards Being Asked for: </Row>
                    <Row>
                        {trade.tradeAccepterCards.map((card, index) => (
                            <Container key={index}>
                                <p>{card}</p>
                            </Container>
                        ))}
                    </Row>
                    {trade.acceptStatus ? (
                        <Button onClick={() => confirmTradeAsMaker(user, trade._id)}>Confirm Trade</Button>
                    ) : (
                        <Button onClick={() => deleteTrade(user, trade._id)}>Delete Trade</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}