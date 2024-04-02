import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import { Trade, CardObj, ParsedTrade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsMaker } from '../TradeDatabaseControl';
import CardDisplayRow from '../CardDisplayRow';
import { getDBCard } from '../CardDatabaseControl';

export default function TradeOfferComponent({ trade }: { trade: ParsedTrade }) {
    const { user } = useContext(UserContext);

    function convertDBtoCardOBJ(card: Promise<any>) {
        card.then((result) => {
            console.log(result.name); // Access the name property once the promise is resolved
            return {
                name: result.name,
                set: result.set,
                price: result.price,
                imageURL: result.imageURL,
                print: result.print,
                setCode: result.setCode,
                cardId: result.number
            };
        }).catch((error) => {
            //alert('Promise error ' + error);
            console.log("Promise error: " + error);
        });

        return {
            name: "",
            set: "",
            price: 0,
            imageURL: "",
            print: "",
            setCode: "",
            cardId: 0
        };
    }

    interface TradeMakerDetails {
        userData: any[];
        // Add other properties if needed
    }

    function isTradeMakerDetails(obj: any): obj is TradeMakerDetails {
        return 'userData' in obj;
    }

    return (
        <Container>
            <Row>
                <Col>
                    {isTradeMakerDetails(trade.tradeAccepterDetails) && <Row><b>Trade Recipient: {trade.tradeAccepterDetails.userData[0].username}</b></Row>}
                    <Row>Cards Being Offered: </Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeMakerCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                            </Col>
                        ))}
                    </Row>
                    <Row>Cards Being Asked for: </Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeAccepterCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                            </Col>
                        ))}
                    </Row>
                    <p>Message: {trade.message}</p>
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