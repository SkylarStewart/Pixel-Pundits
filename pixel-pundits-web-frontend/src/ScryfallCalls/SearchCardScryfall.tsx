import { useState } from "react";
import { CardAPI, CardObj } from "../TypeSheet";

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

export default async function SearchCardScryfall(cardName: string, setCode: string, setSearchData: Function): Promise<void> {
    try {
        let data: Array<CardAPI>;

        if(setCode.length === 0)
            data = (await fetchData("https://api.scryfall.com/cards/search?q=\""+ cardName + "\"&unique=prints")).data.all_parts;
        else
            data = (await fetchData("https://api.scryfall.com/cards/search?q=\""+ cardName + "\"+set%3A" + setCode +"&unique=prints")).data.all_parts;

        console.warn("https://api.scryfall.com/cards/search?q=\""+ cardName + "\"&unique=prints");
        console.warn(data);

        if (data.length === 0) {
            throw new Error("No data provided");
        }

        let arr: Array<CardObj>;

        data.forEach((card: CardAPI) =>{
            card.finishes.forEach((printing) =>{
                console.warn(card);
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

                arr.push({
                    name: card.name,
                    imageUrl: card.image_uris.normal,
                    price: cost,
                    set: card.set_name,
                    print: printing,
                    setCode: card.set,
                    cardId: card.collection_number
                });
            });
        });

        setSearchData(arr);
    } catch (error) {
        if(setCode.length === 0)
            console.error('Error adding card:', "https://api.scryfall.com/cards/search?q="+ name + "&unique=prints");
        else
            console.error('Error adding card:', "https://api.scryfall.com/cards/search?q="+ name + "+set%3A" +setCode +"&unique=prints");
        throw error;
    }
}