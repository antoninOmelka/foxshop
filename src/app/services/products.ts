import { Product, ProductDetailed } from "@/types/product";

const BASE_URL = "http://localhost:3000";

export async function getProducts(name?: string, minStock?: number, maxStock?: number, includeInactive?: boolean): Promise<ProductDetailed[]> {
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

export async function getProduct(id: string): Promise<ProductDetailed> {
    const url = `${BASE_URL}/products/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
    }

    return response.json();
}

export async function createProduct(productData: Omit<Product, "id">): Promise<ProductDetailed> {
    const url = `${BASE_URL}/products`;
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
    }

    return response.json();
}

export async function updateProduct(productData: Product): Promise<ProductDetailed> {
    const url = `${BASE_URL}/products/${productData.id}`;
    const response = await fetch(url, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
    }

    return response.json();
}

export async function deactivateProduct(id: string): Promise<ProductDetailed> {
    const url = `${BASE_URL}/products/${id}`;
    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to deactivate product: ${response.statusText}`);
    }

    return response.json();
}