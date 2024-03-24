import { useEffect, useState, useContext, React } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { CardObj } from "../TypeSheet";
import { navigate, useNavigate } from 'react-router-dom';
import { TradeAcceptComponent } from '../Components/TradingComponents/TradeAcceptComponent';
import { TradeOfferComponent } from '../Components/TradingComponents/TradeOfferComponent';
import { TradeConfirmComponent } from '../Components/TradingComponents/TradeConfirmComponent';
import { getUserOfferTrades, getUserAcceptingTrades, getUserCompletedTrades, addUserOfferTrade } from "../Components/TradeDatabaseControl";
import { UserContext } from "../contexts/user.context";

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
        await getUserOfferTrades(user)
            .then(function (tradeReturn) {
                return setOfferedTrades(tradeReturn.trades);
            })
            .then(function () {
                console.log("Offered Trades Loaded Successfully");
                // Any further actions after setting tshe inventory
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

    //async helper function for loading trades that are incoming
    const loadAcceptingTrades = async () => {
        await getUserAcceptingTrades(user)
            .then(function (tradeReturn) {
                return setAcceptTrades(tradeReturn.trades);
            })
            .then(function () {
                console.log("Accept Trades Loaded Successfully");
                // Any further actions after setting tshe inventory
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

    //effect hook for loading trades that have already been completed
    const loadCompletedTrades = async () => {
        await getUserCompletedTrades(user)
            .then(function (tradeReturn) {
                return setCompletedTrades(tradeReturn.trades);
            })
            .then(function () {
                console.log("Accept Trades Loaded Successfully");
                // Any further actions after setting tshe inventory
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        loadOfferedTrades();
        loadAcceptingTrades();
        loadCompletedTrades();
    }, [user]);



    return (

        <>
            <Container>
                <h1>Outgoing Offers</h1>
            </Container>
            <Container>
                <h1>Incoming Offers</h1>
            </Container>
            <Container>
                <h1>Completed Trades</h1>
            </Container>

            <Button onClick={() => addUserOfferTrade(user, '65ffa0ca4ef6792ed7044728', ['65ff995d27bf5261fc5c2d46', '65ff995d40beeeda10f06a68'], ['65ffa0cc3661c6ad9d305cf4', '65ffa0ce9b8c7c5e0c152138'])}>
                Add Test Trade
            </Button>

        </>
    );
}

