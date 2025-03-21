import { Product, ProductDetailed } from "@/types/product";

const BASE_URL = "http://localhost:3000";

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function getProducts(
    name?: string,
    minStock?: number,
    maxStock?: number,
    includeInactive?: boolean
): Promise<Product[]> {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (minStock !== undefined) params.append("minStock", minStock.toString());
    if (maxStock !== undefined) params.append("maxStock", maxStock.toString());
    if (includeInactive !== undefined) params.append("includeInactive", includeInactive.toString());

    return apiRequest<ProductDetailed[]>(`/products?${params.toString()}`);
}

export async function getProduct(id: string): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>(`/products/${id}`);
}

export async function createProduct(productData: Omit<Product, "id" | "isActive">): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>("/products", {
        method: "POST",
        body: JSON.stringify(productData),
    });
}

export async function updateProduct(productData:  Omit<Product, "isActive">): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>(`/products/${productData.id}`, {
        method: "PATCH",
        body: JSON.stringify(productData),
    });
}

export async function deactivateProduct(id: string): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>(`/products/${id}`, {
        method: "DELETE",
    });
}