import React from 'react';
import { Row, Col, Button, Container, Form, Image, InputGroup } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user.context';
import { getUserFromId } from '../SocialDatabaseControl';
import { getInventoryFromId, getFullInventory } from '../CardDatabaseControl';
import { CardObj } from '../../TypeSheet';

//userData interface
interface UserData {
    inventory: any[];
    metadata: any;
}


//makes a trade. 
export default function TradeMakerMenu(userId2: string) {

    const userId = '66037d91d443583424b57fee';
    const { user } = useContext(UserContext);
    const [otherUserData, setOtherUserData] = useState<UserData | null>(null);
    const [myData, setMyData] = useState<UserData | null>(null);
    const [myPrice, setMyPrice] = useState(0.0);
    const [otherUserPrice, setOtherUserPrice] = useState(0.0);
    const [selectedMyCards, setSelectedMyCards] = useState<{ [key: string]: boolean }>({});
    const [selectedOtherCards, setSelectedOtherCards] = useState<{ [key: string]: boolean }>({});


    //handles checkbox checking for my (the user's ) cards
    const handleMyCheckboxChange = (cardId: string, cardPrice: number, isMyCard: boolean) => {
        const newSelected = { ...selectedMyCards, [cardId]: !selectedMyCards[cardId] };
        setSelectedMyCards(newSelected);

        // Calculate total price
        console.log(selectedMyCards);
    };

    //handles checkbox checking for other user's cards
    const handleOtherCheckboxChange = (cardId: string, cardPrice: number, isMyCard: boolean) => {
        const newSelected = { ...selectedOtherCards, [cardId]: !selectedOtherCards[cardId] };
        setSelectedOtherCards(newSelected);

        console.log(selectedOtherCards);
    }

    const onBoxCheck = () => {
        console.log('swag');
    }

    const onBoxUncheck = () => {
        console.log('bag');
    }

    //handles trade type selection
    const [tradeType, setTradeType] = useState('');

    const handleChange = (e: any) => {
        setTradeType(e.target.value);
    };


    // Function to load other user's data and cards
    const loadOtherUserData = async () => {
        try {
            console.log('user ID being used: ');
            console.log(userId);
            // Loading other user's inventory and metadata from the database
            const rawOtherUserInventory = await getInventoryFromId(user, userId); // Assuming getFullInventory expects an object with an id
            const otherUserMetadata = await getUserFromId(user, userId);

            // Combining inventory and metadata for other user
            const combinedOtherUserData = {
                inventory: rawOtherUserInventory.cards, // Assuming the response has a .cards property
                metadata: otherUserMetadata.userData[0], // Adjust according to actual response structure
            };

            console.log(combinedOtherUserData);

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

            console.log(combinedMyData);

            setMyData(combinedMyData);
        } catch (error) {
            console.error('Error loading my data:', error);
        }
    };

    useEffect(() => {
        loadMyData();
        loadOtherUserData();
    }, [user]);

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
                                        onChange={() => handleMyCheckboxChange(card.id, card.price, true)}
                                    />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <h4>5 Cards Selected</h4>
            <h4>Total Value: $5.33</h4>
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
                                        onChange={() => handleOtherCheckboxChange(card.id, card.price, false)}
                                    />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <h4>3 Cards Selected</h4>
            <h4>Total Value: $4.79</h4>
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
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Mail Trade"
                            name="tradeType"
                            value="mail"
                            checked={tradeType === 'mail'}
                            onChange={handleChange}
                        />
                        <Container style={{ marginTop: '30px' }}>
                        </Container>
                        <h4>Add Instructions/Message</h4>
                        <Form.Control as="textarea" placeholder="Message here..." rows={3}></Form.Control>
                    </Form.Group>
                </Form>
            </Container>
            <Button style={{marginTop: '30px', marginBottom: '30px'}}>
                Submit Trade
            </Button>
        </Container>
    );


}