import {Button, Container, Row, Col} from 'react-bootstrap';
import {CardDisplayRow} from CardDisplayRow;
import { useState } from 'react';

export default function Inventory (setInventory){
    function RemoveCard(){
        setInventory();
    }

    return(
        <Container>
            {userInventory.forEach((card) =>{
                <Container>
                    <CardDisplayRow card={card}/>
                    <Col>
                        <Button onClick={RemoveCard}> Remove Card </Button>
                    </Col>
                </Container>
            })}
        </Container>
    )
}