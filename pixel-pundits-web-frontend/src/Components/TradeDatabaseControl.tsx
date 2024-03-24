
import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CardObj } from "../TypeSheet";
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../realm/constants';

//Database additions/modifications made by users who are trading between each other.

//adds a trade to the database after a user has made an offer.
export async function addUserOfferTrade(user: any, otherUserID: any, offeredCardsIDs: any[], otherUserCardsIDs: any[]): Promise<any> {

    console.log('added user trade');

    //GraphQL query to add all of the stuff
    const addTradeQuery = gql`
    mutation addTrade($data: TradeInsertInput!) {
        insertOneTrade(data: $data) {
            _id
        }
    }
    `;

    const queryVariables = {
        data: {
            acceptStatus: false,
            tradeAccepter: otherUserID,
            tradeAccepterCards: otherUserCardsIDs,
            tradeAccepterConfirmation: false,
            tradeMaker: user.id,
            tradeMakerCards: offeredCardsIDs,
            tradeMakerConfirmation: false,
        }
    }

    //auth header
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //actual processing
    try {
        const response = await request(GRAPHQL_ENDPOINT, addTradeQuery, queryVariables, headers);
        return response;
    }

    catch (error) {
        alert(error);
    }

}

//get all trades that a user has offered others.
export async function getUserOfferTrades(user: any): Promise<any> {

    //gql query to get the trades where the user is the trade maker
    const getUserOfferTradesQuery = gql`
    query getUserOfferTrades($tradeMakerId: ObjectId!) {
    trades(query: {
        tradeMaker: $tradeMakerId,
        AND: [
            {tradeMakerConfirmation: false},
            {tradeAccepterConfirmation: false}
        ]
    }) {
        _id
        acceptStatus
        tradeAccepter
        tradeAccepterCards
        tradeAccepterConfirmation
        tradeMaker
        tradeMakerCards
        tradeMakerConfirmation
    }
}
    `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = {
        tradeMakerId: user.id,
    };

    //auth (adds the following as a header to our request to validate that the correct user gets the correct  data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserOfferTradesQuery,
        queryVariables,
        headers
    );
    return resp;

}

//get all trades that a user needs to accept
export async function getUserAcceptingTrades(user: any): Promise<any> {

    //gql query to get the trades where the user needs to accept the trade
    const getUserAcceptingTradesQuery = gql`
     query getUserAcceptingTrades($tradeAccepterId: ObjectId!) {
         trades(query: {tradeAccepter: $tradeAccepterId
            AND: [
            {tradeMakerConfirmation: false},
            {tradeAccepterConfirmation: false}
        ]}) {
             _id
             acceptStatus
             tradeAccepter
             tradeAccepterCards
             tradeAccepterConfirmation
             tradeMaker
             tradeMakerCards
             tradeMakerConfirmation
         }
     }
     `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = {
        tradeAccepterId: user.id,
    };

    //auth (adds the following as a header to our request to validate that the correct user gets the correct  data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserAcceptingTradesQuery,
        queryVariables,
        headers
    );
    return resp;
}

//get all trades that mention a specific user, regardless of completion, accepting, or offer. general purpose.
export async function getUserTrades(user: any): Promise<any> {
    // gql query to get the trades where the user is either the trade maker or the trade accepter
    const getUserTradesQuery = gql`
    query getUserTrades($userId: ObjectId!) {
        trades(query: { OR: [{tradeMaker: $userId}, {tradeAccepter: $userId}] }) {
            _id
            acceptStatus
            tradeAccepter
            tradeAccepterCards
            tradeAccepterConfirmation
            tradeMaker
            tradeMakerCards
            tradeMakerConfirmation
        }
    }
    `;

    // The userId to filter trades either as maker or accepter
    const queryVariables = {
        userId: user.id,
    };

    // auth (adds the following as a header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    // Actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserTradesQuery,
        queryVariables,
        headers
    );
    return resp;
}

//get all trades that have been completed and have a user in it
export async function getUserCompletedTrades(user: any): Promise<any> {
    // gql query to get the trades where the user is either the trade maker or the trade accepter
    // and both parties have confirmed the trade
    const getUserConfirmedTradesQuery = gql`
    query getUserConfirmedTrades($userId: ObjectId!) {
        trades(query: { 
            OR: [{tradeMaker: $userId}, {tradeAccepter: $userId}],
            tradeAccepterConfirmation: true,
            tradeMakerConfirmation: true
        }) {
            _id
            acceptStatus
            tradeAccepter
            tradeAccepterCards
            tradeAccepterConfirmation
            tradeMaker
            tradeMakerCards
            tradeMakerConfirmation
        }
    }
    `;

    // The userId to filter trades either as maker or accepter
    const queryVariables = {
        userId: user.id,
    };

    // auth (adds the following as a header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    // Actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserConfirmedTradesQuery,
        queryVariables,
        headers
    );
    return resp;
}

export async function updateAcceptStatus(user: any, tradeId: any): Promise<any> {
    const updateAcceptStatusMutation = gql`
    mutation updateAcceptStatus($tradeId: ObjectId!, $userId: ObjectId!) {
        updateOneTrade(
            query: { _id: $tradeId, tradeAccepter: $userId },
            set: { acceptStatus: true }
        ) {
            _id
            acceptStatus
        }
    }
    `;

    const queryVariables = {
        tradeId: tradeId,
        userId: user.id,
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
        const response = await request(GRAPHQL_ENDPOINT, updateAcceptStatusMutation, queryVariables, headers);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function confirmTradeAsAccepter(user: any, tradeId: any): Promise<any> {
    const confirmTradeMutation = gql`
    mutation confirmTradeAsAccepter($tradeId: ObjectId!, $userId: ObjectId!) {
        updateOneTrade(
            query: { _id: $tradeId, tradeAccepter: $userId },
            set: { tradeAccepterConfirmation: true }
        ) {
            _id
            tradeAccepterConfirmation
        }
    }
    `;

    const queryVariables = {
        tradeId: tradeId,
        userId: user.id,
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
        const response = await request(GRAPHQL_ENDPOINT, confirmTradeMutation, queryVariables, headers);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function confirmTradeAsMaker(user: any, tradeId: any): Promise<any> {
    const confirmTradeMutation = gql`
    mutation confirmTradeAsMaker($tradeId: ObjectId!, $userId: ObjectId!) {
        updateOneTrade(
            query: { _id: $tradeId, tradeMaker: $userId },
            set: { tradeMakerConfirmation: true }
        ) {
            _id
            tradeMakerConfirmation
        }
    }
    `;

    const queryVariables = {
        tradeId: tradeId,
        userId: user.id,
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
        const response = await request(GRAPHQL_ENDPOINT, confirmTradeMutation, queryVariables, headers);
        return response;
    } catch (error) {
        console.error(error);
    }
}


export async function deleteTrade(user: any, tradeId: any): Promise<any> {
    const deleteTradeMutation = gql`
    mutation deleteTrade($tradeId: ObjectId!) {
        deleteOneTrade(query: {_id: $tradeId}) {
            _id
        }
    }
    `;

    const queryVariables = {
        tradeId: tradeId,
    };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    try {
        const response = await request(GRAPHQL_ENDPOINT, deleteTradeMutation, queryVariables, headers);
        return response;
    } catch (error) {
        console.error("Error deleting the trade:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}