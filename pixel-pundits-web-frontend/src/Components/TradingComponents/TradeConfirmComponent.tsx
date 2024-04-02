import React from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap'
import { Trade, CardObj, ParsedTrade, } from '../../TypeSheet';
import CardDisplayRow from '../CardDisplayRow';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { deleteTrade, updateAcceptStatus, confirmTradeAsAccepter, confirmTradeAsMaker } from '../TradeDatabaseControl';


export default function TradeConfirmComponent({ trade }: { trade: ParsedTrade }) {

    //user context
    const { user } = useContext(UserContext)

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
                    {
                        (isTradeMakerDetails(trade.tradeAccepterDetails) && trade.tradeAccepterDetails.userData.length > 0 && user.username === trade.tradeAccepterDetails.userData[0].username) ?
                            (isTradeMakerDetails(trade.tradeAccepterDetails) && <Row><b>Trade Partner: {trade.tradeAccepterDetails.userData[0].username}</b></Row>) :
                            (isTradeMakerDetails(trade.tradeAccepterDetails) && <Row><b>Trade Partner: {trade.tradeAccepterDetails.userData[0].username}</b></Row>)
                    }
                    <Row><h4>Their Cards: </h4></Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeMakerCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                                <p>Price: {card.price}</p>
                            </Col>
                        ))}
                    </Row>
                    <Row><h4>Your Cards: </h4></Row>
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
                    <Row style={{ marginTop: '30px', marginBottom: '30px' }}><h4>Trade Confirmed Complete</h4></Row>

                </Col>
            </Row>
        </Container>
    );
}