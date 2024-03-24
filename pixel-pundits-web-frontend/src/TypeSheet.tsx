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
    imageUrl: string;
    print: string;
    setCode: string;
    cardId: number;
}

export interface Trade {
    _id: string;
    acceptStatus: boolean;
    tradeAccepter: string;
    tradeAccepterCards: string[];
    tradeAccepterConfirmation: false;
    tradeMaker: string;
    tradeMakerCards: string[];
    tradeMakerConfirmation: boolean;

}