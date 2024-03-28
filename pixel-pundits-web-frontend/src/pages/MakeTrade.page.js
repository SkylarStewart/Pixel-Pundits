import React from 'react';
import {useLocation, useParams} from 'react-router-dom'
import TradeMakerMenu from '../Components/TradingComponents/TradeMakerMenu';
import {Button } from 'react-bootstrap';

export default function MakeTrade() {

    let {id} = useParams()


    return (
        <div>
            <TradeMakerMenu userId = {id}></TradeMakerMenu>
        </div>
    )
}