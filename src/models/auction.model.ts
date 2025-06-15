export interface Auction {
    id?: string;
    name: string;
    price: string;
    createdAt: string;
    endDate: string;
    image: string;
    model: string;
    currentPrice: string;
}

export interface AuctionItem {
    id: string;
    name: string;
    model: string;
    price: string;
    currentPrice: string;
    createdAt: string;
    endDate: string;
    image: string;
}

export type AuctionMockData = {
    auctions: AuctionItem[];
    auctionsToModule: AuctionItem[];
};