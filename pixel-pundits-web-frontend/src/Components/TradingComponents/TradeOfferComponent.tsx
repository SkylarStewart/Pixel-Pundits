import React, { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Container, Image, Table, Modal, Form, FormControl } from 'react-bootstrap';
import { Trade, CardObj, ParsedTrade } from '../../TypeSheet';
import { UserContext } from '../../contexts/user.context';
import { updateAcceptStatus, deleteTrade, confirmTradeAsMaker } from '../TradeDatabaseControl';
import CardDisplayRow from '../CardDisplayRow';
import { getDBCard } from '../CardDatabaseControl';


interface Card {
    name: string;
    imageURL: string;
    set: string;
    price: number;
    print: string;
    ownerData?: {
        username: string;
    };
}

interface Props {
    cards: Card[];
}

export default function TradeOfferComponent({ trade }: { trade: ParsedTrade }) {
    const { user } = useContext(UserContext);

    //state for table
    const [search, setSearch] = useState<string>('');
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [filteredMakerCards, setFilteredmakerCards] = useState<Card[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalImageUrl, setModalImageUrl] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


    useEffect(() => {
        filterAndSortAccepterCards(search, sortOrder);
        filterAndSortMakerCards(search, sortOrder);
    }, [filteredCards, filteredMakerCards, sortOrder, search]);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearch(value);
    };

    const handleImageClick = (event: React.MouseEvent<HTMLAnchorElement>, imageUrl: string): void => {
        event.preventDefault();
        setModalImageUrl(imageUrl);
        setShowModal(true);
    };

    const handleCloseModal = (): void => {
        setShowModal(false);
    };

    const handleSortByPrice = (): void => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const filterAndSortAccepterCards = (searchTerm: string, sortOrder: 'asc' | 'desc'): void => {
        let filtered = trade.tradeAccepterCardsDetails;
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
        console.log("filtered cards: ");
        console.log(filteredCards);
    };

    const filterAndSortMakerCards = (searchTerm: string, sortOrder: 'asc' | 'desc'): void => {
        let filtered = trade.tradeMakerCardsDetails;
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
        setFilteredmakerCards(filtered);
    };


    function convertDBtoCardOBJ(card: Promise<any>) {
        card.then((result) => {
            return {
                name: result.name,
                set: result.set,
                price: result.price,
                imageURL: result.imageURL,
                print: result.print,
                setCode: result.setCode,
                cardId: result.number
            };
        }).catch((error) => {
            //alert('Promise error ' + error);
            console.log("Promise error: " + error);
        });

        return {
            name: "",
            set: "",
            price: 0,
            imageURL: "",
            print: "",
            setCode: "",
            cardId: 0
        };
    }

    interface TradeMakerDetails {
        userData: any[];
        // Add other properties if needed
    }

    function isTradeMakerDetails(obj: any): obj is TradeMakerDetails {
        return 'userData' in obj;
    }

    return (
        <Container>
            <h1>Outgoing Offers</h1>
            <Row>
                <Col>
                    {isTradeMakerDetails(trade.tradeAccepterDetails) && <Row><h4>Trade Recipient: {trade.tradeAccepterDetails.userData[0].username}</h4></Row>}
                    <Row><h4>Their Cards: </h4></Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
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
                                            <td><Button variant="dark">Trade</Button></td>
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
                    </Row>
                    <Row><h4>Your Cards: </h4></Row>
                    <Row xs={1} md={4} className="g-4" style={{ marginTop: "0px" }}>
                        {trade.tradeAccepterCardsDetails.map((card, index) => (
                            <Col key={index}>
                                <Image src={card.imageURL} style={{ paddingBottom: '010px' }}></Image>
                                <p>{card.name}</p>
                            </Col>
                        ))}
                    </Row>
                    <Row style={{ marginTop: '30px' }}><h4>Message: {trade.message}</h4></Row>
                    {trade.acceptStatus ? (
                        <Button onClick={() => confirmTradeAsMaker(user, trade._id)}>Confirm Trade</Button>
                    ) : (
                        <Button variant="dark" onClick={() => deleteTrade(user, trade._id)}>Delete Trade</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}