import React, { useContext } from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import { Trade, CardObj, ParsedTrade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsAccepter } from '../TradeDatabaseControl';
import { getDBCard } from '../CardDatabaseControl';
import CardDisplayRow from '../CardDisplayRow';

export default function TradeAcceptComponent({ trade }: { trade: ParsedTrade }) {
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
                    {isTradeMakerDetails(trade.tradeMakerDetails) && <Row>Incoming Trade from: {trade.tradeMakerDetails.userData[0].username}</Row>}
                    <Row><h4>Their Cards:</h4></Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeMakerCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                                <p>Price: {card.price}</p>
                            </Col>
                        ))}
                    </Row>
                    <Row><h4>Your Cards:</h4></Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeAccepterCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                                <p>Price: {card.price}</p>
                            </Col>
                        ))}
                    </Row>
                    <Row style={{ marginTop: '30px' }}><h4>Message: {trade.message}</h4></Row>
                    {trade.acceptStatus ? (
                        <>
                            <Row style={{ marginTop: '30px', marginBottom: '30px' }}><h4>Trade Accepted, Confirm Trade has Occured:</h4></Row>
                            <Button onClick={() => confirmTradeAsAccepter(user, trade._id)}>Confirm Trade</Button>

                        </>
                    ) : (
                        <>
                            <Row style={{ marginTop: '30px', marginBottom: '30px' }}><h4>Accept or Decline Trade:</h4></Row>
                            <Button onClick={() => updateAcceptStatus(user, trade._id)} style={{ marginRight: "10px" }}>Accept Trade</Button>
                            <Button onClick={() => deleteTrade(user, trade._id)}>Decline Trade</Button>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
