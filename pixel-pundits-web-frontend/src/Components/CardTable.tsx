import React, { useState, useEffect } from 'react';
import { Table, Button, Image, FormControl, Form, Modal } from 'react-bootstrap';
import { CardObj } from '../TypeSheet';
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';


interface Card {
    name: string;
    imageURL: string;
    set: string;
    price: number;
    print: string;
    ownerData?: {
        username: string;
        user_id: string;
    };
}

interface Props {
    cards: Card[];
}

const TradingCardTable: React.FC<Props> = ({ cards }) => {


    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalImageUrl, setModalImageUrl] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleTradeNavigate = (data: any) => {
        const URLID = data;
        navigate(`/maketrade/${URLID}`);

    }

    useEffect(() => {
        filterAndSortCards(search, sortOrder);
    }, [cards, sortOrder, search]);

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

    const filterAndSortCards = (searchTerm: string, sortOrder: 'asc' | 'desc'): void => {
        let filtered = cards;
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

    return (
        <div>
            <h2>Recommended Trades (Gainesville, FL)</h2>
            <Form className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Form>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Set</th>
                            <th onClick={handleSortByPrice} style={{ cursor: 'pointer' }}>Price</th>
                            <th>Print</th>
                            {cards.some(card => card.ownerData) && <th>Owner</th>}
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
                                {card.ownerData ? <td>{card.ownerData.username}</td> : <td />}
                                <td><Button variant="dark" onClick={() => {
                                    if (card.ownerData) {
                                        handleTradeNavigate(card.ownerData.user_id);
                                    } else {
                                        console.error("Owner data is missing for this card");
                                    }
                                }}>Trade</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>w
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
    );
};

export default TradingCardTable;