import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Trade, CardObj, ParsedTrade } from '../../TypeSheet';
import CardDisplayRow from '../CardDisplayRow';
import { UserContext } from '../../contexts/user.context';
import { useContext } from 'react';
import { deleteTrade, updateAcceptStatus, confirmTradeAsAccepter, confirmTradeAsMaker } from '../TradeDatabaseControl';


export default function TradeConfirmComponent({ trade }: { trade: ParsedTrade }) {

    //user context
    const { user } = useContext(UserContext)

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
                    <p>TRADE WITH ID: {trade.tradeMaker}</p>
                </Col>
                <Col>
                    <Row>Trade Initializer: {trade.tradeMaker}</Row>
                    <Row>Their Cards:  </Row>
                    <Row>
                        {trade.tradeMakerCardsDetails.map((card, index) => (
                            <Container key={index}>
                                <CardDisplayRow card={card}/>
                                <hr/>
                            </Container>
                        ))}
                    </Row>
                    <Row>Your Cards: </Row>
                    <Row>
                        {trade.tradeAccepterCardsDetails.map((card, index) => (
                            <Container key={index}>
                                <CardDisplayRow card={card}/>
                                <hr/>
                            </Container>
                        ))}
                    </Row>
                    <Row>Trade Confirmed Complete</Row>
                </Col>
            </Row>
        </Container>
    );
}