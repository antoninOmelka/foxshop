export interface Product {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    isActive: boolean;
}

interface PriceHistoryEntry {
    id: number;
    productId: number;
    oldPrice: number;
    newPrice: number;
    changedAt: string;
}

export interface ProductDetailed extends Product {
    createdAt: string;
    updatedAt: string;
    priceHistory?: PriceHistoryEntry[];
}
