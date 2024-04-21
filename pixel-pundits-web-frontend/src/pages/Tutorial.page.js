import React from "react";
import { Accordion } from "react-bootstrap";
import Footer from "../Components/Footer";
import { Row, Col, Button, Container } from "react-bootstrap";

export default function Tutorial() {
    return (
        <div className="body-background-freeform">
            <Container style = {{paddingTop: "40px"}}>
                <Container style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }}>
                    <h1>Modifying Inventory</h1>
                    <hr />
                    <p>
                        The inventory is where a user would store there collection of cards they are willing to trade at a given moment.
                        It can be found in the Profile tab.
                    </p>
                    <h3><u>Using the Search to Add Cards</u></h3>
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
                    <h3><u>Removing Cards From Inventory</u></h3>
                    <p>
                        Let's say you got a new deck and want to take a card out of your trade binder to put in it. Then you would also
                        want to take it out of your inventory too. To do that, all you have to do is scroll and find the card in your inventory,
                        then press the Remove Card button next to the card info and it'll dissapear.
                    </p>
                </Container>
            </Container>

            <Container style = {{paddingTop: "40px", paddingBottom: "40px"}}>
                <Container style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }}>
                    <h1>Making a Trade</h1>
                    <hr />
                    <h3><u>Initializing a Trade</u></h3>
                    <p>
                        In order to initalize a trade, you need to find a trade partner. There are to ways to do this. There is a search bar on the home
                        page under the titles "Want to Make a Trade?" That search has to modes. The first mode is to search for a user. That mode is
                        good for if you know the person you want to make a trade with or started trade discussions outside of the app. The other mode
                        is to search by card. This mode is better for if you want a specific card but don't have a trade partner in mind. Regardless,
                        once you enter your search query, a list of names show up, and you can pick your trade partner from there.
                    </p>
                    <p>
                        Once you added a trade partner, you need to pick the cards to trade. Check off each person's cards that you propose be in the trade.
                        Our application provides a running total of prices to help keep track of trade fairness. Once you are happy with the cards selected,
                        click on other the trade by mail or trade in person boxes, add a message, and click on the submit trade box. If you want to check that
                        the trade submitted, you can look Outgoing Offers section of the Trades page. Additionally, you can rescind the offer by clicking the
                        delete button after it was sent.
                    </p>
                    <h3><u>Receiving a Trade Offer</u></h3>
                    <p>
                        In order to check if you've received an offer, check Incoming Trades section of the Trades page. If you see a trade offer, make sure
                        to look over it. If you like the offer, press accept. If not, press delete and the offer will be declined. If you pressed accept, the
                        initializer will be notified and can begin the process of trading.
                    </p>
                    <h3><u>Doing the Trade</u></h3>
                    <p>
                        How you trade the cards is entirely up to you and the person you trade with. But, you do have a way to confirm on the app that the
                        trade has been completed and verify you got the cards. All trades that have been accepted but not completed can be found under the
                        Confirmed Trades tab in the Trades page. Once you get your new cards, mark that the trade has been completed. Once both parties have
                        done so, both inventories will be updated appropriately.
                    </p>
                </Container>
            </Container>


            <Footer />
        </div>
    )
}