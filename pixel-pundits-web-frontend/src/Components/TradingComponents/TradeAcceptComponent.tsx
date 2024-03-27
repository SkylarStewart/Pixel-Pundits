import React, { useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Trade, CardObj, ParsedTrade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsAccepter } from '../TradeDatabaseControl';
import { getDBCard } from '../CardDatabaseControl';
import CardDisplayRow from '../CardDisplayRow';

export default function TradeAcceptComponent({ trade }: { trade: ParsedTrade }) {
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
                    {isTradeMakerDetails(trade.tradeMakerDetails) && <Row><b>Trade Intiializer: {trade.tradeMakerDetails.userData[0].username}</b></Row>}
                    <Row>Their Cards:</Row>
                    <Row>
                        {trade.tradeMakerCardsDetails.map((card, index) => (
                            <Container key={index}>
                                <CardDisplayRow card={card}/>
                                <hr/>
                            </Container>
                        ))}
                    </Row>
                    <Row>Your Cards:</Row>
                    <Row>
                        {trade.tradeAccepterCardsDetails.map((card, index) => (
                            <Container key={index}>
                                <CardDisplayRow card={card}/>
                                <hr/>
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
