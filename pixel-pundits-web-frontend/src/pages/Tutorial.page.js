import React from "react";
import { Accordion } from "react-bootstrap";

export default function Tutorial(){
    return(
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h1>Modifying Inventory</h1></Accordion.Header>
                    <Accordion.Body>
                        <p>
                            The inventory is where a user would store there collection of cards they are willing to trade at a given moment.
                            It can be found in the Profile tab.
                        </p>
                        <h2>Using the search to add cards</h2>
                        <p>
                            In order to add a card, you need to find it first. To do so, you can use the search tool on the Profile page.
                            To get started, simply enter the name of the card and press search. After that, you will see every variant of
                            that card split by set, print (foil, nonfoil, etched), and art. For some cards, that can be an overwhelming amount 
                            of versions for a specific card, like basic lands or any commander staple. To help cut down on that, you can also 
                            search by set code.  A set code is a 3 character symbol on the bottom-left or bottom-center of each card that 
                            indicates what set it was from. You can enter the set code into the search for and then press the search button. 
                            That should help narrow down the amount of cards to look through. Once you find the card your looking for, simply 
                            press the Add Card button next to the card information and it will show up in your inventory.
                        </p>
                        <h2>Removing cards from inventory</h2>
                        <p>
                            Let's say you got a new deck and want to take a card out of your trade binder to put in it. Then you would also
                            want to take it out of your inventory too. To do that, all you have to do is scroll and find the card in your inventory,
                            then press the Remove Card button next to the card info and it'll dissapear.
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h1>Making a Trade</h1></Accordion.Header>
                    <Accordion.Body>.....</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}