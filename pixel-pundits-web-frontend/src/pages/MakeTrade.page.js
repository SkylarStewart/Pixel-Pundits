import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import TradeMakerMenu from '../Components/TradingComponents/TradeMakerMenu';

export default function MakeTrade() {

    const location = useLocation();
    const data = location.state || {};
    console.log(data);

    return (
        <div>
            <TradeMakerMenu userId = {data.id}></TradeMakerMenu>
        </div>
    )
}