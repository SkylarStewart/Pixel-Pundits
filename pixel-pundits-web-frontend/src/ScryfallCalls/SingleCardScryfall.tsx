import { CardObj } from "../TypeSheet";

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

export default async function SingleCardScryfall(setCode: string, cardId: number, printing: string): Promise<CardObj> {
    try {
        const data = await fetchData("https://api.scryfall.com/cards/" + setCode.toLowerCase() + "/" + cardId);

        if (!data.finishes || !data.finishes.includes(printing)) {
            throw new Error(data.finishes);
        }

        let cost: number;
        
        switch(printing){
            case "nonfoil":
                cost = data.prices.usd;
                break;
            case "foil":
                cost = data.prices.usd_foil;
                break;
            case "etched":
                cost = data.prices.usd_etched;
                break;
            default:
                cost = 0;
                break;
        }

         return({
            name: data.name,
            imageURL: data.image_uris.small,
            price: cost,
            set: data.set_name,
            print: printing,
            setCode: setCode,
            cardId: cardId
        });
    } catch (error) {
        console.error('Error adding card:', "https://api.scryfall.com/cards/" + setCode.toLowerCase() + "/" + cardId);
        throw error;
    }
}