import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CardObj } from "../TypeSheet";
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../realm/constants';

//retrieves a user's ID based off of their username
//will retrieve multiple users if required
export async function getUserFromUsername(user: any, usernameInput: string): Promise<any> {

    const getUserFromUsernameQuery = gql`
    query getUserDatum($username: String!) {
        userData(query: {username: $username}) {
            _id
            private
            username
            user_id
        }
    }
    `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = { username: usernameInput };

    //auth (adds the following as as header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` }

    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserFromUsernameQuery,
        queryVariables,
        headers
    );

    return resp;
}

//retrieves a user's ID based off of their ID
export async function getUserFromId(user: any, id: string): Promise<any> {

    const getUserFromIdQuery = gql`
    query getUserDatum($id: ObjectId!) {
        userData(query: {user_id: $id}) {
            _id
            private
            username
            user_id
        }
    }
    `;

    //filtering (empty for now, change if we need to do more)
    const queryVariables = { id: id };

    //auth (adds the following as as header to our request to validate that the correct user gets the correct data)
    const headers = { Authorization: `Bearer ${user._accessToken}` }

    //actual processing
    const resp = await request(GRAPHQL_ENDPOINT,
        getUserFromIdQuery,
        queryVariables,
        headers
    );

    return resp;
}

// Function to fetch multiple user metadatas based on an array of user IDs
export async function getUsersFromIds(user: any, ids: string[]): Promise<any> {
    const getUsersFromIdsQuery = gql`
        query getUsersData($ids: [ObjectId!]!) {
            userData(query: {user_id_in: $ids}) {
                _id
                private
                username
                user_id
            }
        }
    `;

    const queryVariables = { ids };

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const resp: any = await request(GRAPHQL_ENDPOINT,
         getUsersFromIdsQuery,
          queryVariables,
           headers);
           
    return resp;
}