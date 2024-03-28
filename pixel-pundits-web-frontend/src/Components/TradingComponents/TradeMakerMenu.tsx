import React from 'react';
import { Row, Col, Button, Container, Form, Image, InputGroup } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user.context';
import { getUserFromId } from '../SocialDatabaseControl';
import { getInventoryFromId, getFullInventory } from '../CardDatabaseControl';
import { CardObj } from '../../TypeSheet';
import { useNavigate } from 'react-router-dom';
import { addUserOfferTrade } from '../TradeDatabaseControl';

//userData interface
interface UserData {
    inventory: any[];
    metadata: any;
}


//makes a trade. 
export default function TradeMakerMenu(userId: any) {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    //state control for loading in all appropriate trade data
    const [otherUserData, setOtherUserData] = useState<UserData | null>(null);
    const [myData, setMyData] = useState<UserData | null>(null);

    //state control for keeping track of the price
    const [myPrice, setMyPrice] = useState(0.0);
    const [otherUserPrice, setOtherUserPrice] = useState(0.0);

    //state control for keeping track of which cards are selected
    const [selectedMyCards, setSelectedMyCards] = useState<{ [key: string]: boolean }>({});
    const [selectedOtherCards, setSelectedOtherCards] = useState<{ [key: string]: boolean }>({});


    //handles trade type selection
    const [tradeType, setTradeType] = useState('');
    const handleTradeTypeChange = (e: any) => {
        setTradeType(e.target.value);
    };

    //handles taking in user message
    const [message, setMessage] = useState('');
    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
        console.log(message);
    }


    //handles checkbox checking for my (the user's ) cards
    const handleMyCheckboxChange = (cardId: string, cardPrice: number) => {
        setSelectedMyCards(prev => {
            const newState = { ...prev, [cardId]: !prev[cardId] };

            // Update total price based on new selection state
            const newTotalPrice = Object.entries(newState).reduce((acc, [id, isSelected]) => {
                if (isSelected) {
                    const card = myData?.inventory.find(card => card._id === id);
                    return acc + (card?.price || 0);
                }
                return acc;
            }, 0);

            setMyPrice(newTotalPrice);
            return newState;
        });
    };

    //handles checkbox checking for other user's cards
    const handleOtherCheckboxChange = (cardId: string, cardPrice: number) => {
        setSelectedOtherCards(prev => {
            const newState = { ...prev, [cardId]: !prev[cardId] };

            // Update total price based on new selection state
            const newTotalPrice = Object.entries(newState).reduce((acc, [id, isSelected]) => {
                if (isSelected) {
                    const card = otherUserData?.inventory.find(card => card._id === id);
                    return acc + (card?.price || 0);
                }
                return acc;
            }, 0);

            setOtherUserPrice(newTotalPrice);
            return newState;
        });

        console.log(selectedOtherCards);
    };

    // Function to load other user's data and cards
    const loadOtherUserData = async () => {
        try {
            // Loading other user's inventory and metadata from the database
            const rawOtherUserInventory = await getInventoryFromId(user, userId.userId); // Assuming getFullInventory expects an object with an id
            const otherUserMetadata = await getUserFromId(user, userId.userId);

            // Combining inventory and metadata for other user
            const combinedOtherUserData = {
                inventory: rawOtherUserInventory.cards, // Assuming the response has a .cards property
                metadata: otherUserMetadata.userData[0], // Adjust according to actual response structure
            };
            setOtherUserData(combinedOtherUserData);
        } catch (error) {
            console.error('Error loading other user data:', error);
        }
    };

    // Function to load current user's data and cards
    const loadMyData = async () => {
        try {
            // Loading current user's inventory and metadata from the database
            const rawMyInventory = await getFullInventory(user);
            const myMetadata = await getUserFromId(user, user.id);

            // Combining inventory and metadata for current user
            const combinedMyData = {
                inventory: rawMyInventory.cards, // Assuming the response has a .cards property
                metadata: myMetadata.userData[0], // Adjust according to actual response structure
            };

            setMyData(combinedMyData);
        } catch (error) {
            console.error('Error loading my data:', error);
        }
    };

    useEffect(() => {
        loadMyData();
        loadOtherUserData();
    }, [user]);

    //runs when a trade is completed
    const submitTrade = async () => {

        //first array
        const mySelectedCardIds = Object.entries(selectedMyCards).filter(([cardId, isSelected]) => isSelected).map(([cardId]) => cardId);
        //second array
        const otherSelectedCardIds = Object.entries(selectedOtherCards).filter(([cardId, isSelected]) => isSelected).map(([cardId]) => cardId);
        await addUserOfferTrade(user, userId.userId, mySelectedCardIds, otherSelectedCardIds, message, tradeType);
        navigate('/completedtrade');
    }

    return (
        <Container style={{ paddingTop: '30px' }}>
            <h1>New Trade</h1>
            <Row className="mb-4" style={{ paddingTop: "30px" }}>
                <Col>
                    <h2>My Inventory ({myData?.metadata?.username})</h2>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {myData?.inventory.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <Form.Group controlId={`my-card-${index}`}>
                                    <Form.Check
                                        type="checkbox"
                                        label={`${card.name} - $${card.price}`}
                                        onChange={() => handleMyCheckboxChange(card._id, card.price)}
                                    />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <h4>{Object.keys(selectedMyCards).filter(key => selectedMyCards[key]).length} Cards Selected</h4>
            <h4>Total Value: ${myPrice.toFixed(2)}</h4>
            <Row className="mb-4" style={{ paddingTop: "30px" }}>
                <Col>
                    <h2>{otherUserData?.metadata?.username}{"'"}s Inventory</h2>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {otherUserData?.inventory.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL}></Image>
                                <Form.Group controlId={`other-card-${index}`}>
                                    <Form.Check
                                        type="checkbox"
                                        label={`${card.name} - $${card.price}`}
                                        onChange={() => handleOtherCheckboxChange(card._id, card.price)}
                                    />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <h4>{Object.keys(selectedOtherCards).filter(key => selectedOtherCards[key]).length} Cards Selected</h4>
            <h4>Total Value: ${otherUserPrice.toFixed(2)}</h4>
            <Container style={{ paddingTop: '30px' }}>
                <Form>
                    <Form.Group style={{ marginLeft: '-10px' }}>
                        <h4>Select Trade Type</h4>
                        <Form.Check
                            type="radio"
                            label="In-Person Trade"
                            name="tradeType"
                            value="in-person"
                            checked={tradeType === 'in-person'}
                            onChange={handleTradeTypeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Mail Trade"
                            name="tradeType"
                            value="mail"
                            checked={tradeType === 'mail'}
                            onChange={handleTradeTypeChange}
                        />
                        <Container style={{ marginTop: '30px' }}>
                        </Container>
                        <h4>Add Instructions/Message</h4>
                        <Form.Control as="textarea" placeholder="Message here..." rows={3} onChange={handleMessageChange}></Form.Control>
                    </Form.Group>
                </Form>
            </Container>
            <Button style={{ marginTop: '30px', marginBottom: '30px' }} onClick={submitTrade}>
                Submit Trade
            </Button>
        </Container>
    );


}