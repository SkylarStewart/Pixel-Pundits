import { Button, Container, Row, Col } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow'
import { CardObj } from '../TypeSheet';
import * as Realm from "realm-web"
import { UserContext } from '../contexts/user.context';
import { useContext, useState } from "react";
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../realm/constants';

//abstraction using our app services and GraphQL to perform CRUD operations on our data. most of these functions require you to pass in
//a user object (see the bottom of user.context.js for reference)


//Adds a card to the inventory of the current user
//pass in a JSON form with 
export async function addDBCard(user: any, form: CardObj): Promise<any> {
    console.log('adding a card to the database: ')
    //graphql query to add a new card
    const addCardQuery = gql`
    mutation AddCard($data: CardInsertInput!) {
        insertOneCard(data: $data) {
            _id
        }
    }
    `;

    console.log(form);

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
export async function removeDBCard(user: any): Promise<any> {
    const returnObject = {}
    return returnObject;
}

//Edits a card in the inventory of the current user
//WIP
export async function editDBCard(user: any): Promise<any> {
    const returnObject = {}
    return returnObject;
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
    console.log('ran a statement')
    console.log(resp);
    return resp;
}


//test function (COMMENT THIS SHIT OUT GOD DAMN!!!!!)
// function testing() {
//     const { user } = useContext(UserContext);
// }