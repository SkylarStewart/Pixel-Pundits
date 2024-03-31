import React from 'react';
import { Row, Col, Button, Container, Form, Image } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { getUserFromUsername, getUsersFromIds } from './SocialDatabaseControl';
import { getCardsByName } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';
import { useNavigate } from 'react-router-dom';

export default function UserSearch() {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);


    const handleTradeNavigate = (data) => {
        const URLID = data;
        navigate(`/maketrade/${URLID}`);

    }

    //state controls
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("users");
    const [returnedUsers, setReturnedUsers] = useState([]);
    const [returnedCards, setReturnedCards] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    //Handler for changing search type
    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    }

    //Placeholder text based on search type
    const placeholderText = searchType === "users" ? "Search for Users..." : "Search for Cards...";

    //async helper function for getting user metadata query
    const searchUsers = async () => {
        //gets all users
        try {
            const userSearchResults = await getUserFromUsername(user, searchValue);
            setReturnedUsers(userSearchResults.userData);
        }
        catch (error) {
            console.error(error);
        }


    }

    const onUserSearch = (event) => {
        searchUsers();
    }

    const onCardSearch = (event) => {
        searchCards();
    }

    //async helper function for getting cards and the card owners, combining them, and returning the results
    const searchCards = async () => {
        try {
            const cardSearchResults = await getCardsByName(user, searchValue);
            const ownerIds = cardSearchResults.cards.map(card => card.owner); // Extract owner IDs from cards
            const uniqueOwnerIds = [...new Set(ownerIds)]; // Remove duplicates
            const usersMetadata = await getUsersFromIds(user, uniqueOwnerIds);
            const usersMetadataParsed = usersMetadata.userData;
            // Combine each card with its owner's metadata
            const combinedData = cardSearchResults.cards.map(card => {
                const ownerData = usersMetadataParsed.find(user => user.user_id === card.owner);
                return {
                    ...card,
                    ownerData
                };
            });

            setReturnedCards(combinedData);
            console.log(returnedCards);
        } catch (error) {
            console.error('Error combining card data with user metadata:', error);
        }
    }

    //search submission handler
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchType === "users") {
            setReturnedCards([]);
            onUserSearch();
        } else if (searchType === "cards") {
            setReturnedUsers([]);
            onCardSearch();
        }
    }


    return (
        <>
            {/* search and button to enter search*/}
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{ width: '350px' }} controlid="username">
                    <Form.Control
                        type="text"
                        placeholder={placeholderText}
                        value={searchValue}
                        onChange={handleSearchChange}
                        style={{ textAlign: 'left' }} />
                </Form.Group>
            </Form>
            {/*Radio buttons for selecting search type*/}
            <div key={`inline-radio`} className="mb-3">
                <Form.Check
                    inline
                    label="Search for Users"
                    name="searchType"
                    type="radio"
                    id={`inline-radio-1`}
                    value="users"
                    checked={searchType === "users"}
                    onChange={handleSearchTypeChange}
                />
                <Form.Check
                    inline
                    label="Search for Cards"
                    name="searchType"
                    type="radio"
                    id={`inline-radio-2`}
                    value="cards"
                    checked={searchType === "cards"}
                    onChange={handleSearchTypeChange}
                />
            </div>
            {/*rendering for cards and users*/}
            <Container style={{ marginLeft: '0' }}>
                {returnedUsers.map((user, index) => (
                    <div key={index}>
                        <Container>
                            <Row className="align-items-center" style={{ maxWidth: '350px', width: '90vw', marginTop: '10px', marginBottom: '20px' }}>
                                {/* Profile Picture */}
                                <Col xs="auto">
                                    <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png'} roundedCircle style={{ width: '50px', height: '50px' }} />
                                </Col>
                                {/* Username */}
                                <Col>
                                    <h4 className="mb-0">{user.username}</h4>
                                </Col>
                                {/* Trade Button */}
                                <Col xs="auto">
                                    <Button onClick={() => handleTradeNavigate(user.user_id)}>Trade with User</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ))}
            </Container>
            <Container>
                {/* {returnedCards.map((card, index) => (
                    <Container key={index}>
                        <p>{card.name}</p>
                        <p>{card.ownerData.username}</p>
                        <Button onClick={() => handleTradeNavigate(card.ownerData.user_id)}>Trade With Card Owner</Button>
                        
                    </Container>
                ))} */}

                <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                    {returnedCards.map((card, index) => (
                        <Col key={index}>
                            <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                            <p>{card.name}</p>
                            <p>Owner: {card.ownerData.username}</p>
                            <Button onClick={() => handleTradeNavigate(card.ownerData.user_id)}>Trade With Owner</Button>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    );
}