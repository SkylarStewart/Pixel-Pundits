import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Trade, CardObj } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsMaker } from '../TradeDatabaseControl';
import CardDisplayRow from '../CardDisplayRow';
import { getDBCard } from '../CardDatabaseControl';

export default function TradeOfferComponent({ trade }: { trade: Trade }) {
    const { user } = useContext(UserContext);
    
    function convertDBtoCardOBJ(card: Promise<any>){
        card.then((result) => {
            console.log(result.name); // Access the name property once the promise is resolved
            return{
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
                                <CardDisplayRow card={convertDBtoCardOBJ(getDBCard(user, card))}/>
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