import React from "react";
import { Container, Button, Row, Form, FormControl, Col} from "react-bootstrap"
import CardDisplayRow from './CardDisplayRow'
import { useState } from "react";
import SearchCardScryfall from "../ScryfallCalls/SearchCardScryfall"

export default function AddCardToCollection(setInventory){
    const [searchResults, setSearchResults] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchSet, setSearchSet] = useState("");

    function AddCard(){
        setInventory();
    }

    function handleNameChange(event){
        setSearchName(event.target.value);
    }

    function handleSetChange(event){
        setSearchSet(event.target.value);
    }

    function updateSearch(){
        setSearchResults(SearchCardScryfall(searchName, searchSet, setSearchResults));
    }
    
    return (
        <Container>
            <Form>
                <Form.Control type="text" placeholder="Card Name" onChange={handleNameChange}/>
                <Form.Control type="text" placeholder="Set Code" onChange={handleSetChange}/>
            </Form>

            <Button onClick={updateSearch}> Update Search </Button>
    
            {
                searchResults.forEach((card) =>(
                    <Row>
                        <Col><CardDisplayRow card={card}/></Col>
                        <Col>
                            <Button onClick={AddCard}> Add Card </Button>
                        </Col>
                    </Row>
                ))
            }
        </Container>
    );
}