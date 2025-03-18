import { Product } from "@/types/product";

const BASE_URL = "http://localhost:3000";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    return response.json();
}