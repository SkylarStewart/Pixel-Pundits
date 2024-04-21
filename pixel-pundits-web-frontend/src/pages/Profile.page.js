/*
This page is going to be the page that displays the user's profile.
The plan is that, from here, users can see there profile info, make changes,
add and remove cards from their trade binder, and see trade history.
*/
import { useEffect, useState, useContext, React } from "react";
import { UserContext } from "../contexts/user.context";
import Inventory from "../Components/Inventory";
import AddCardToCollection from "../Components/AddCardToCollection";
import { getFullInventory, addDBCard } from "../Components/CardDatabaseControl";
import { getUserFromUsername } from "../Components/SocialDatabaseControl";
import CardDisplayRow from "../Components/CardDisplayRow";
import { Form, Row, Col, Container, Button, Modal, Image, Table, FormControl } from "react-bootstrap";
import SearchCardScryfall from "../ScryfallCalls/SearchCardScryfall";
import Footer from "../Components/Footer";

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
    const [value, setValue] = useState("");

    //table-related state tracking
    const [filteredCards, setFilteredCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');


    const handleImageClick = (event, imageUrl) => {
        event.preventDefault();
        setModalImageUrl(imageUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSortByPrice = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const filterAndSortCards = (searchTerm, sortOrder) => {
        let filtered = searchArr;
        if (searchTerm) {
            filtered = filtered.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setFilteredCards(filtered);
    };

    //async helper function
    const loadCards = async () => {
        try {
            const inven = await getFullInventory(user);
            setInventory(inven.cards);

            const totalPrice = inven.cards.reduce((acc, card) => acc + card.price, 0).toFixed(2);

            // Set the total price in state
            setValue(totalPrice);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        loadCards();
    }, [user])

    const handleSearchCardNameChange = (event) => {
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
                setSearchArr(result);
                setFilteredCards(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }

    //help function passed back to the inventory to help with deletion
    const helperFunctionLoad = () => {
        loadCards();
    }


    const elementsPerRow = 4;

    return (
        <div className="body-background-freeform" >
            <Container style={{ paddingTop: '40px', }}>

                <Container style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }}>
                    <h1>User Profile - {user._profile.data.email}</h1>
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
                    <Button variant="dark" onClick={searchAPI} style={{ marginTop: '20px' }}> Search </Button>
                    <div style={{ marginTop: "20px" }}>
                        {/* {searchArr.length > 0 && searchArr.map((card, index) => (
                            card.name &&
                            index % elementsPerRow === 0 && (
                                <Row key={`row-${index}`} className="justify-content-center">
                                    {searchArr.slice(index, index + elementsPerRow).map((card, subIndex) => (
                                        <Col key={`col-${subIndex}`}>
                                            <CardDisplayRow card={card} />
                                            <Button variant="dark" onClick={() => addDBCard(user, card, helperFunctionLoad)} className="btn btn-primary">Add Card</Button>
                                        </Col>
                                    ))}
                                </Row>
                            )
                        ))} */}

                        <div style={{ marginTop: "20px" }}>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Set</th>
                                            <th onClick={handleSortByPrice} style={{ cursor: 'pointer' }}>Price</th>
                                            <th>Print</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCards.map((card, index) => (
                                            <tr key={index}>
                                                <td onClick={() => { handleImageClick }}><Image src={card.imageURL} style={{ height: "60px", width: "40px" }}></Image></td>
                                                <td>{card.name}</td>
                                                <td>{card.set}</td>
                                                <td>${card.price}</td>
                                                <td>{card.print}</td>
                                                <td><Button variant="dark" onClick={() => addDBCard(user, card, helperFunctionLoad)} className="btn btn-primary">Add Card</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Modal show={showModal} onHide={handleCloseModal} centered>
                                    <Modal.Body style={{
                                        padding: "10px",
                                        width: "220px",
                                        height: "320px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Image src={modalImageUrl} alt="Card Image" fluid onClick={handleCloseModal} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>

                </Container>

                <Container style={{
                    marginTop: "50px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    marginBottom: "20px"

                }}>
                    <div>
                        <h1>Inventory</h1>
                        <h4>Card Count: {inventory.length}</h4>
                        <h4>Estimated Inventory Value: {value} </h4>
                        <Inventory cards={inventory} helperFunction={helperFunctionLoad} />
                    </div>
                </Container>

                <br />
            </Container>
            <Footer />
        </div>
    );
}