export interface Auction {
    id?: string;
    name: string;
    price: number;
    createdAt: string;
    endDate: string;
    image: string;
    model: string;
    currentPrice: number;
}

export interface AuctionItem {
    id: string;
    name: string;
    model: string;
    price: number;
    currentPrice: number;
    createdAt: string;
    endDate: string;
    image: string;
}

export type AuctionMockData = {
    auctions: AuctionItem[];
    auctionsToModule: AuctionItem[];
};

export type CreateAuctionConfig = Omit<Auction, 'currentPrice' | 'createdAt'>