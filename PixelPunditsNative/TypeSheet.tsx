export interface CardAPI {
    name: string;
    image_uris: {
        normal: string;
    };
    prices: {
        usd: number;
        usd_foil: number;
        usd_etched: number;
    };
    set_name: string;
    finishes: string[];
}

export interface CardObj {
    name: string;
    set: string;
    price: number;
    imageUrl: string;
    print: string
}