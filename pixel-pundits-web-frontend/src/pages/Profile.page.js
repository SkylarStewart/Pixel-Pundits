/*
This page is going to be the page that displays the user's profile.
The plan is that, from here, users can see there profile info, make changes,
add and remove cards from their trade binder, and see trade history.
*/
import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Button } from "@mui/material";
import Inventory from "../components/Inventory";
import AddCardToCollection from "../components/AddCardToCollection";
import { getFullInventory, addDBCard } from "../components/CardDatabaseControl";
import CardDisplayRow from "../components/CardDisplayRow";
import { Form, Row } from "react-bootstrap";
import SearchCardScryfall from "../ScryfallCalls/SearchCardScryfall";

export default function Profile() {

    //example card (used for adding a test card)
    // const [card, setCard] = useState([{
    //     cardId: 123,
    //     imageUrl: "test URL",
    //     name: "test name",
    //     price: 100,
    //     print: "test print",
    //     set: "test set",
    //     setCode: 2345,
    // }])


    const { user } = useContext(UserContext);
    const [inventory, setInventory] = useState([]);
    const [searchCardName, setSearchCardName] = useState("");
    const [searchCardSet, setSearchCardSet] = useState("");
    const [searchArr, setSearchArr] = useState([{}]);

    useEffect(() => {
        getFullInventory(user)
            .then(function(inven) {
                return setInventory(inven.cards);
            })
            .then(function() {
                console.log("Inventory set successfully.");
                // Any further actions after setting the inventory
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        console.log(searchArr);
    }, [])

    useEffect(() =>{
        console.log(searchArr);
    }, [searchArr])

    //runs when we add the example card to our database
    const onSubmit = async (event) => {
        event.preventDefault();
        //addDBCard(user, card)
        
    }

    function printArr(){
        console.log(inventory);
    }

    const handleSearchCardNameChange = (event) => {
        console.log(event);
        console.log(searchCardName);
        setSearchCardName(event.target.value);
    };

    const handleSearchCardSetChange = (event) => {
        setSearchCardSet(event.target.value);
    };

    function searchAPI(){
        if(searchCardName === ""){
            alert("No card name provided");
            return;
        }
        async function fetchData() {
            try {
                const result = await SearchCardScryfall(searchCardName, searchCardSet, searchArr);
                console.log(result);
                console.log(JSON.stringify(result));
                console.log(typeof result);
                setSearchArr(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchData();
    }

    return (
        <>
            <h1>User Profile</h1>
            <p>user email: {user._profile.data.email}</p>

            <Form>
                <Form.Group controlId="cardName">
                    <Form.Label>Card Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchCardName}
                        onChange={handleSearchCardNameChange}
                    />
                </Form.Group>
                <Form.Group controlId="cardSet">
                    <Form.Label>Set Code:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchCardSet}
                        onChange={handleSearchCardSetChange}
                    />
                </Form.Group>
            </Form>

            <Button onClick={searchAPI}> Search </Button>

            {
                searchArr.map((card) => {
                    return <CardDisplayRow key={card.cardId} card={card}/>
                })
            }
                

            {/* {<Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={onSubmit}>
                ADD TEST CARD
            </Button>} */}

            <Button onClick={printArr}>Test Print</Button>

            {
                inventory.forEach((c) =>{
                    //console.log(c);
                    <Row>
                        <CardDisplayRow card={c}/>
                    </Row>
                    
                })
            }

            {/* <div>
            <AddCardToCollection setInventory={setInventory}/>
            <Inventory setInventory={setInventory}/>
        </div> */}

        </>
    );
}