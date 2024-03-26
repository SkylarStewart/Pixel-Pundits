import React from 'react';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { getUserFromUsername } from './SocialDatabaseControl';
import { getCardsByName } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';

export default function UserSearch() {

    const { user } = useContext(UserContext);
    //state controls
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("users");
    const [returnedUsers, setReturnedUsers] = useState([]);
    const [returnedCards, setReturnedCards] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    //state control for search results (users by username, cards, etc)
    const [contentDisplayed, setContentDisplayed] = useState(null);

    //Handler for changing search type
    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    }

    //Placeholder text based on search type
    const placeholderText = searchType === "users" ? "Search for Users..." : "Search for Cards...";

    //async helper function for getting user metadata query
    const searchUsers = async () => {
        await getUserFromUsername(user, searchValue)
            .then(function (users) {
                return setReturnedUsers(users);
            })
            .then(function () {
                console.log("Found users successfully.");
                console.log(returnedUsers);
            })
            .catch(function (error) {
                console.error('Error: ', error);
            })

    }

    const searchCards = async () => {
        await getCardsByName(user, searchValue)
            .then(function (cards) {
                return setReturnedCards(cards);
            })
            .then(function () {
                console.log("Found cards successfully.");
                console.log(returnedCards);
            })
            .catch(function (error) {
                console.error('Error: ', error)
            })
    }

    const onCardSearch = () => {
        searchCards();
    };

    const onUserSearch = () => {
        searchUsers();
    };

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
        </>
    );
}