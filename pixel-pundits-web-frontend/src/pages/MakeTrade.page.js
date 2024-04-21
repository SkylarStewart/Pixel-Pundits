import React from 'react';
import { useLocation, useParams } from 'react-router-dom'
import TradeMakerMenu from '../Components/TradingComponents/TradeMakerMenu';
import { Button } from 'react-bootstrap';
import Footer from '../Components/Footer';

export default function MakeTrade() {

    let { id } = useParams()


    return (
        <div className="body-background-freeform">
            <TradeMakerMenu userId={id}></TradeMakerMenu>
            <Footer />
        </div>
    )
}