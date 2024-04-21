import { Table, Button, Image, FormControl, Form, Modal, Container } from 'react-bootstrap';
import CardDisplayRow from './CardDisplayRow';
import CardDisplaySolo from './CardDisplaySolo';
import { useState, React, useEffect } from 'react';
import { deleteDBCard } from './CardDatabaseControl';
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';

/*eslint-disable*/

export default function Inventory({ cards, helperFunction }) {

    const { user } = useContext(UserContext)
    const [search, setSearch] = useState('');
    const [filteredCards, setFilteredCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        filterAndSortCards(search, sortOrder);
    }, [cards, sortOrder, search]);


    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    };

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


    const style = {
        paddingTop: '1rem',
        //paddingBottom: '1rem',
    };

    const elementsPerRow = 4;

    return (
        <div style={{marginTop: "20px"}}>
            {/* {cards.map((card, index) => (
                // Use modulus operator to determine when to start a new row
                index % elementsPerRow === 0 && (
                    <Row key={`row-${index}`} className="justify-content-center">
                        {cards.slice(index, index + elementsPerRow).map((card, subIndex) => (
                            <Col key={`col-${subIndex}`}>
                                <div key={card.cardId}>
                                    <CardDisplaySolo card={card} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                )
            ))} */}
            <div>
                <Form className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Form>
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
                                <td><Button variant="dark" onClick={() => deleteDBCard(user, card._id, helperFunction)}>Delete</Button></td>
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
    )
}