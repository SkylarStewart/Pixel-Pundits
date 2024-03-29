/*
This page is going to be the page that displays the user's profile.
The plan is that, from here, users can see there profile info, make changes,
add and remove cards from their trade binder, and see trade history.
*/
import { useEffect, useState, useContext, React } from "react";
import { UserContext } from "../contexts/user.context";
import { Button } from "@mui/material";
import Inventory from "../Components/Inventory";
import AddCardToCollection from "../Components/AddCardToCollection";
import { getFullInventory, addDBCard} from "../Components/CardDatabaseControl";
import { getUserFromUsername } from "../Components/SocialDatabaseControl";
import CardDisplayRow from "../Components/CardDisplayRow";
import { Form, Row, Col, Container } from "react-bootstrap";
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

    //async helper function
    const loadCards = async () => {
        await getFullInventory(user)
            .then(function (inven) {
                return setInventory(inven.cards);
            })
            .then(function () {
                console.log("Inventory set successfully.");
                // Any further actions after setting the inventory
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        loadCards();
    }, [user])

    useEffect(() => {
        console.log(searchArr);
    }, [searchArr])

    //runs when we add the example card to our database
    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     //addDBCard(user, card)
    // }

    function printArr() {
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

    function searchAPI() {
        if (searchCardName === "") {
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

    //help function passed back to the inventory to help with deletion
    const afterDelete = () => {
        loadCards();
        console.log('deleted a card....');
    }
    
    //test function to test the username search capability.
    const testSearch = async() => {
        const username = "test32";
        const resp = await getUserFromUsername(user, username);
        console.log(resp);
    }

    const elementsPerRow = 4;

    return (
        <>
            <h1>User Profile</h1>
            <p>User Email: {user._profile.data.email}</p>
            {user._profile.data.username && <p>Username: {user._profile.data.username}</p>} {/* WIP, need variable name??*/}

            <Form>
                <Form.Group controlId="cardName">
                    <Form.Label>Card Name:</Form.Label>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Form.Control
                            type="text"
                            value={searchCardName}
                            onChange={handleSearchCardNameChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group controlId="cardSet">
                    <Form.Label>Set Code:</Form.Label>
                     <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Form.Control
                            type="text"
                            value={searchCardSet}
                            onChange={handleSearchCardSetChange}
                        />
                    </Col>
                </Form.Group>
            </Form>

            <Button onClick={searchAPI} class="btn btn-primary"> Search </Button>

            <Container>
                {searchArr[0].name && searchArr.map((card, index) => (
                    index % elementsPerRow === 0 && (
                    <Row key={`row-${index}`} className="justify-content-center">
                        {searchArr.slice(index, index + elementsPerRow).map((card, subIndex) => (
                        <Col key={`col-${subIndex}`}>
                            <CardDisplayRow card={card} />
                            <Button onClick={() => addDBCard(user, card)} className="btn btn-primary">Add Card</Button>
                        </Col>
                        ))}
                    </Row>
                    )
                ))}
            </Container>


            {/* {<Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={onSubmit}>
                ADD TEST CARD
            </Button>} */}

            {/* <Button onClick={printArr}>Test Print</Button>
            <Button onClick={testSearch}>Test Query</Button> */}

            {/* {
                inventory.forEach((c) => {
                    //console.log(c);
                    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                        <Row>
                            <CardDisplayRow card={c} />
                        </Row>
                    </div>
                })
            } */}

            <div>
                <h1>Inventory</h1>
                <Inventory cards={inventory} helperFunction={afterDelete} />
            </div>

            <br/>

        </>
    );
}