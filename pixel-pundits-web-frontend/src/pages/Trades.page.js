import { useEffect, useState, useContext, React } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { CardObj } from "../TypeSheet";
import { navigate, useNavigate } from 'react-router-dom';
import TradeAcceptComponent from '../Components/TradingComponents/TradeAcceptComponent';
import TradeOfferComponent from '../Components/TradingComponents/TradeOfferComponent';
import TradeConfirmComponent from '../Components/TradingComponents/TradeConfirmComponent';
import { getUserOfferTrades, getUserAcceptingTrades, getUserCompletedTrades, addUserOfferTrade } from "../Components/TradeDatabaseControl";
import { getCardsByArrayOfIds, getDBCard } from "../Components/CardDatabaseControl";
import { getUserFromId } from "../Components/SocialDatabaseControl";
import { UserContext } from "../contexts/user.context";
import TradeMakerMenu from '../Components/TradingComponents/TradeMakerMenu';
import Footer from "../Components/Footer";

//TEST PAGE for showing that the trade mechanic works as intended.=
export default function Trades() {


    const exampleTrade = {
        acceptStatus: false,
        tradeAccepter: '',
        tradeAccepterCards: ["", "", "",],
        tradeAccepterConfirmation: false,
        tradeMaker: '',
        tradeMakerCards: ["", ""],
        tradeMakerConfirmation: "false",
    }

    const { user } = useContext(UserContext);
    const [offeredTrades, setOfferedTrades] = useState([]);
    const [acceptTrades, setAcceptTrades] = useState([]);
    const [completedTrades, setCompletedTrades] = useState([]);


    //async helper function for loading offered trades
    const loadOfferedTrades = async () => {
        try {
            const tradeResult = await getUserOfferTrades(user);
            const tradesWithCardDetails = await Promise.all(tradeResult.trades.map(async (trade) => {
                // Gets card details for the cards you're offering (trademaker)
                const tradeMakerCardsResponse = await getCardsByArrayOfIds(user, trade.tradeMakerCards);
                // Gets card details for the cards you've offered (trade accepter)
                const tradeAccepterCardsResponse = await getCardsByArrayOfIds(user, trade.tradeAccepterCards);

                // Assuming getCardsByArrayOfIds returns an object with a cards field
                const tradeMakerCardsDetails = tradeMakerCardsResponse.cards;
                const tradeAccepterCardsDetails = tradeAccepterCardsResponse.cards;


                // // Fetch metadata for the trade accepter and trade offerer
                const tradeMakerMetadataResponse = await getUserFromId(user, trade.tradeMaker);
                const tradeAccepterMetadataResponse = await getUserFromId(user, trade.tradeAccepter);

                const tradeMakerDetails = tradeMakerMetadataResponse;
                const tradeAccepterDetails = tradeAccepterMetadataResponse;

                // Enhance the trade object with detailed card information
                return {
                    ...trade,
                    tradeMakerCardsDetails,
                    tradeAccepterCardsDetails,
                    tradeMakerDetails,
                    tradeAccepterDetails,
                };
            }));

            setOfferedTrades(tradesWithCardDetails);
            console.log(offeredTrades);
        } catch (error) {
            console.error('Error loading offered trades with card details:', error);
        }
    };

    //async helper function for loading trades that are incoming
    const loadAcceptingTrades = async () => {
        try {
            const tradeResult = await getUserAcceptingTrades(user);
            const tradesWithCardDetails = await Promise.all(tradeResult.trades.map(async (trade) => {
                // Gets card details for the cards you're offering (trademaker)
                const tradeMakerCardsResponse = await getCardsByArrayOfIds(user, trade.tradeMakerCards);
                // Gets card details for the cards you've offered (trade accepter)
                const tradeAccepterCardsResponse = await getCardsByArrayOfIds(user, trade.tradeAccepterCards);

                // Assuming getCardsByArrayOfIds returns an object with a cards field
                const tradeMakerCardsDetails = tradeMakerCardsResponse.cards;
                const tradeAccepterCardsDetails = tradeAccepterCardsResponse.cards;


                // // Fetch metadata for the trade accepter and trade offerer
                const tradeMakerMetadataResponse = await getUserFromId(user, trade.tradeMaker);
                const tradeAccepterMetadataResponse = await getUserFromId(user, trade.tradeAccepter);

                const tradeMakerDetails = tradeMakerMetadataResponse;
                const tradeAccepterDetails = tradeAccepterMetadataResponse;

                // Enhance the trade object with detailed card information
                return {
                    ...trade,
                    tradeMakerCardsDetails,
                    tradeAccepterCardsDetails,
                    tradeMakerDetails,
                    tradeAccepterDetails,
                };
            }));

            setAcceptTrades(tradesWithCardDetails);
            console.log(acceptTrades);
        } catch (error) {
            console.error('Error loading offered trades with card details:', error);
        }
    }

    //effect hook for loading trades that have already been completed
    const loadCompletedTrades = async () => {
        try {
            const tradeResult = await getUserCompletedTrades(user);
            const tradesWithCardDetails = await Promise.all(tradeResult.trades.map(async (trade) => {
                // Gets card details for the cards you're offering (trademaker)
                const tradeMakerCardsResponse = await getCardsByArrayOfIds(user, trade.tradeMakerCards);
                // Gets card details for the cards you've offered (trade accepter)
                const tradeAccepterCardsResponse = await getCardsByArrayOfIds(user, trade.tradeAccepterCards);

                // Assuming getCardsByArrayOfIds returns an object with a cards field
                const tradeMakerCardsDetails = tradeMakerCardsResponse.cards;
                const tradeAccepterCardsDetails = tradeAccepterCardsResponse.cards;


                // // Fetch metadata for the trade accepter and trade offerer
                const tradeMakerMetadataResponse = await getUserFromId(user, trade.tradeMaker);
                const tradeAccepterMetadataResponse = await getUserFromId(user, trade.tradeAccepter);

                const tradeMakerDetails = tradeMakerMetadataResponse;
                const tradeAccepterDetails = tradeAccepterMetadataResponse;

                // Enhance the trade object with detailed card information
                return {
                    ...trade,
                    tradeMakerCardsDetails,
                    tradeAccepterCardsDetails,
                    tradeMakerDetails,
                    tradeAccepterDetails,
                };
            }));

            setCompletedTrades(tradesWithCardDetails);
            console.log(completedTrades);
        } catch (error) {
            console.error('Error loading offered trades with card details:', error);
        }
    }

    useEffect(() => {
        loadOfferedTrades();
        loadAcceptingTrades();
        loadCompletedTrades();
    }, [user]);



    return (
        <div className="body-background-freeform">
            <Container style={{ paddingTop: "20px" }}>
                <h1>Outgoing Offers</h1>
                {offeredTrades.map((trade, index) => (
                    <Container key={index}>
                        <TradeOfferComponent trade={trade} />
                    </Container>

                ))}
            </Container>
            <Container style={{ paddingTop: "20px" }}>
                <h1>Incoming Offers</h1>
                {acceptTrades.map((trade, index) => (
                    <Container key={index}>
                        <TradeAcceptComponent trade={trade} />
                    </Container>

                ))}
            </Container>
            <Container style={{ paddingTop: "20px" }}>
                <h1>Completed Trades</h1>
                {completedTrades.map((trade, index) => (
                    <Container key={index}>
                        <TradeConfirmComponent trade={trade} />
                    </Container>

                ))}
            </Container>

                <Footer />
        </div>
    );
}

