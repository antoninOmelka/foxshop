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

function buildQueryString(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams.toString();
}

export async function getProducts(name?: string, minStock?: number, maxStock?: number, includeInactive?: boolean): Promise<ProductDetailed[]> {
    const params = { name, minStock, maxStock, includeInactive };
    const queryString = buildQueryString(params);
    return apiRequest<ProductDetailed[]>(`/products?${queryString}`);
}

export async function getProduct(id: string): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>(`/products/${id}`);
}

export async function createProduct(productData: Omit<Product, "id">): Promise<ProductDetailed> {
    return apiRequest<ProductDetailed>("/products", {
        method: "POST",
        body: JSON.stringify(productData),
    });
}

export async function updateProduct(productData: Product): Promise<ProductDetailed> {
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