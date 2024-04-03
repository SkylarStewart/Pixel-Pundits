//home page
import { UserContext } from "../contexts/user.context";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, React, useState, useEffect } from 'react';
import UserSearch from "../Components/UserSearch";
import TradeMakerMenu from "../Components/TradingComponents/TradeMakerMenu";
import { Container, Row, Col } from 'react-bootstrap';
import { getUsersFromIds } from "../Components/SocialDatabaseControl";
import { getRandomCards } from "../Components/CardDatabaseControl";
import { Image, Button } from "react-bootstrap";


export default function Home() {


    const navigate = useNavigate();
    const location = useLocation();
    const [discoveredCards, setDiscoveredCards] = useState([]);
    const { user } = useContext(UserContext);


    const { logOutUser } = useContext(UserContext);

    //runs to log out user (will be used in places other than the homepage, testing for now)
    const onLogout = async () => {
        //tries to log out
        try {
            const isLoggedOut = await logOutUser();
            if (isLoggedOut == true) {
                logoutRedirect();
            }
        }
        catch (error) {
            alert(error)
        }
    }
    const logoutRedirect = () => {
        navigate("/login")
    }

    const handleTradeNavigate = (data) => {
        const URLID = data;
        navigate(`/maketrade/${URLID}`);

    }


    const loadDiscoveredCards = async () => {
        try {
            const cardSearchResults = await getRandomCards(user);
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

            setDiscoveredCards(combinedData);
        } catch (error) {
            console.error('Error fectching random cards:', error);
        }
    }


    useEffect(() => {
        loadDiscoveredCards();
    }, [user]);



    return (
        <Container className="d-flex flex-column align-items-center" style={{ minHeight: "100vh", marginTop: "40px" }}>
            <h1>Pixel Pundits: The App</h1>
            <UserSearch />
            <Container className="d-flex flex-column align-items-center" style={{ marginTop: "90px" }}>
                <h3>Reccommended Cards - Gainesville, FL</h3>
                <Container>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px", justifyContent: 'center' }}>
                        {discoveredCards.map((card, index) => (
                            <Col key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                <Image src={card.imageURL} style={{ paddingBottom: '10px', maxWidth: '100%', height: 'auto' }}></Image>
                                <p style={{ textAlign: 'center' }}>{card.name}</p>
                                <p style={{ textAlign: 'center' }}>Owner: {card.ownerData.username}</p>
                                <Button onClick={() => handleTradeNavigate(card.ownerData.user_id)}>Trade With Owner</Button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        </Container>
    )
}