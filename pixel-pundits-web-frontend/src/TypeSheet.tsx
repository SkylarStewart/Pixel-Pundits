export interface CardAPI {
    name: string;
    image_uris: {
        small: string;
    };
    prices: {
        usd: number;
        usd_foil: number;
        usd_etched: number;
    };
    set_name: string;
    finishes: string[];
    set: string;
    collection_number: number;
    card_faces: Array<{
        image_uris: {
            small: string;
        }
    }>;
}

export interface CardObj {
    name: string;
    set: string;
    price: number;
    imageURL: string;
    print: string;
    setCode: string;
    cardId: number;
}