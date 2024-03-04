import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow'
import { CardObj } from '../TypeSheet';
import * as Realm from "realm-web"
import { UserContext } from '../contexts/user.context';
import { useContext, useState } from "react";
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../realm/constants';
import { AnySrvRecord } from 'dns';

//abstraction using our app services and GraphQL to perform CRUD operations on our data. most of these functions require you to pass in
//a user object (see the bottom of user.context.js for reference)


//Grabs a given card from the user's inventory given the unique _id
//the _id is NOT the cardID, which defines the exact card in an MTG set.
//the _id can differentiate between two of the exact same cards.

// export async function getDBCard(user: any, id: string): Promise<any> {

// }

//Adds a card to the inventory of the current user
//pass in a JSON form with 
export async function addDBCard(user: any, form: CardObj): Promise<any> {
    //graphql query to add a new card
    const addCardQuery = gql`
    mutation AddCard($data: CardInsertInput!) {
        insertOneCard(data: $data) {
            _id
        }
    }
    `;

    //graphQL data
    const queryVariables = {
        data: {
            cardID: form.cardId,
            imageURL: form.imageUrl,
            name: form.name,
            price: form.price,
            print: form.print,
            set: form.set,
            setCode: form.setCode,
            owner: user.id
        }
    }

    //auth (adds the following as a header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //acutal processing
    try {
        await request(GRAPHQL_ENDPOINT, addCardQuery, queryVariables, headers);
    }

    catch (error) {
        alert(error);
    }

    const returnObject = {}
    return returnObject;

}


//Removes a card from the inventory of the current user
//WIP
export async function deleteDBCard(user: any, _id: any, deleteHelper: any): Promise<any> {

    //GraphQL query to delete a card
    const deleteCardQuery = gql`
    mutation DeleteCard($query: CardInsertInput!) {
        deleteOneCard(query: $query) {
            _id
        }
    }
    `;

    //Passing the card-id in the query to delete a specific card
    const queryVariables = { query: { _id } };
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //actual processing
    const resp = window.confirm("Are you sure that you wnat to delete this card?");
    if (!resp) return;

    try {
        await request(GRAPHQL_ENDPOINT, deleteCardQuery, queryVariables, headers);
        deleteHelper();
    }
    catch (error) {
        alert(error);
    }

    const returnObject = {}
    return returnObject;
}

export async function getDBCard(user: any, _id: any): Promise<any> {

    //GraphQL query to retreive a
    const getCardQuery = gql`
    query getCard(_id: $_id) {
        cards {
            _id
            cardID
            imageURL
            cardName
            price
            print
            set
            setCode
            owner
        }
    }
    `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = {};
    
    //auth (adds the following as a header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` };
    
    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getCardQuery,
        queryVariables,
        headers
    );
    return resp;
}


//returns the full inventory of the current user
export async function getFullInventory(user: any): Promise<any> {

    //graphql query to fetch all cards from a user's inventory (the collection):
    const getFullInventoryQuery = gql`
    query getFullInventory {
        cards {
            _id
            cardID
            imageURL
            name
            price
            print
            set
            setCode
            owner
        }
    }
    `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = {};

    //auth (adds the following as a header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` }

    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getFullInventoryQuery,
        queryVariables,
        headers
    );
    return resp;
}

//test function (COMMENT THIS SHIT OUT GOD DAMN!!!!!)
// function testing() {
//     const { user } = useContext(UserContext);
// }