import { useState } from "react";
import { CardAPI, CardObj } from "../TypeSheet";
/*eslint-disable*/
async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default async function SearchCardScryfall(cardName: string, setCode: string, setSearchData: Function): Promise<Array<CardObj>> {
    try {
        let data: Array<CardAPI>;

        if(setCode.length === 0)
            data = (await fetchData("https://api.scryfall.com/cards/search?q=\""+ cardName + "\"&unique=prints")).data;
        else
            data = (await fetchData("https://api.scryfall.com/cards/search?q=\""+ cardName + "\"+set%3A" + setCode.toLowerCase() +"&unique=prints")).data;

        console.log(data.length);

        if (data.length === 0) {
            throw new Error("No data provided");
        }

        let arr: Array<CardObj> = [];

        data.forEach((card: CardAPI) =>{
            card.finishes.forEach((printing) =>{
                let cost: number;
                switch(printing){
                    case "nonfoil":
                        cost = card.prices.usd;
                        break;
                    case "foil":
                        cost = card.prices.usd_foil;
                        break;
                    case "etched":
                        cost = card.prices.usd_etched;
                        break;
                    default:
                        cost = 0;
                        break;
                }

                if(card.card_faces && card.card_faces[0].image_uris){
                    arr.push({
                        name: card.name,
                        imageURL: card.card_faces[0].image_uris.small,
                        price: cost,
                        set: card.set_name,
                        print: printing,
                        setCode: card.set,
                        cardId: card.collection_number
                    })
                }
                else{
                    arr.push({
                        name: card.name,
                        imageURL: card.image_uris.small,
                        price: cost,
                        set: card.set_name,
                        print: printing,
                        setCode: card.set,
                        cardId: card.collection_number
                    });
                }
            });
        });

        return arr;
    } catch (error) {
        if(setCode.length === 0){
            alert("Error with search URL: https://api.scryfall.com/cards/search?q="+ cardName + "&unique=prints");
        }
        else
            alert("Error with search URL: https://api.scryfall.com/cards/search?q="+ cardName + "+set%3A" +setCode +"&unique=prints");
        return [];
    }
}