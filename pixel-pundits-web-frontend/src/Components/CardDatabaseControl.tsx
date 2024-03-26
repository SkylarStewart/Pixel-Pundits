import { CardObj } from '../TypeSheet';
import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../realm/constants';

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
            imageURL: form.imageURL,
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
    mutation DeleteCard($query: CardQueryInput!) {
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
        const resp = await request(GRAPHQL_ENDPOINT, deleteCardQuery, queryVariables, headers);
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
    query getCard($id: ObjectId) {
        cards(query: {_id: $id}) {
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
    const queryVariables = { id: _id };

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
    query getFullInventory($ownerId: ObjectId!) {
        cards(query: {owner: $ownerId}) {
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
    const queryVariables = {
        ownerId: user.id
    };

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

//adds a user's metadata to the metadata collection after signing up
//ONLY USE WHEN ABSOLUTELY NECESSARY. HAS POTENTIAL TO BE INSECURE
export async function addUserMetadata(user: any, username: string, privateStatus: boolean): Promise<any> {

    const id = user.id;
    //graphql query to add a new card
    const addUserMetadataQuery = gql`
    mutation AddUserMetadata($data: UserDatumInsertInput!) {
        insertOneUserDatum(data: $data) {
            _id
        }
    }
    `

    const queryVariables = {
        data: {
            private: privateStatus,
            username: username,
            user_id: id,
        }
    }

    const headers = { Authorization: `Bearer ${user._accessToken}` };

    //actual processing 
    try {
        await request(GRAPHQL_ENDPOINT, addUserMetadataQuery, queryVariables, headers);
    }
    catch (error) {
        console.log(error);
        alert(error);
    }

    const returnObject = {}
    return returnObject;

}

// Function to retrieve all cards with a matching name from the MongoDB collection
export async function getCardsByName(user: any, cardName: string): Promise<any> {
    // GraphQL query to retrieve cards by name
    const getCardsByNameQuery = gql`
    query GetCardsByName($name: String!, $ownerId: ObjectId!) {
        cards(query: {name: $name, owner_ne: $ownerId}) {
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

    // Defining query variables with the card name
    const queryVariables = {
        name: cardName,
        ownerId: user.id
    };

    // Adding the authorization header to validate the user
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    // Processing the query
    try {
        const resp = await request(GRAPHQL_ENDPOINT, getCardsByNameQuery, queryVariables, headers);
        return resp; // Assuming the response object has a cards field containing the results
    } catch (error) {
        console.error('Error fetching cards by name:', error);
        throw error;
    }
}

export async function getCardsByArrayOfIds(user: any, cardIds: string[]): Promise<any> {
    // GraphQL query to retrieve cards by an array of IDs
    const getCardsByArrayOfIdsQuery = gql`
    query getCardsByArrayOfIds($ids: [ObjectId!]) {
        cards(query: {_id_in: $ids}) {
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

    // Defining query variables with the array of card IDs
    const queryVariables = {
        ids: cardIds
    };

    // Adding the authorization header to validate the user
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    // Processing the query
    try {
        const resp = await request(GRAPHQL_ENDPOINT, getCardsByArrayOfIdsQuery, queryVariables, headers);
        return resp; // Assuming the response object has a cards field containing the results
    } catch (error) {
        console.error('Error fetching cards by array of IDs:', error);
        throw error;
    }
}
