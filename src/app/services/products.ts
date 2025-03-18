import { Product } from "@/types/product";

const BASE_URL = "http://localhost:3000";

export async function getProducts(name?: string, minStock?: number, maxStock?: number, includeInactive?: boolean): Promise<Product[]> {
    const params = new URLSearchParams();
    Object.entries({ name, minStock, maxStock, includeInactive }).forEach(([key, value]) => {
        if (value !== undefined) {
            params.append(key, value.toString());
        }
    });
  
    const url = `${BASE_URL}/products?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    return response.json();
}