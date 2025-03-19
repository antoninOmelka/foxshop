"use client"

import { getProduct } from "@/app/services/products";
import EditableProductItem from "@/components/EditableProductItem/EditableProductItem";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductItemDetail = () => {
    const params = useParams();
    const productId = String(params?.productId);
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProduct(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [productId]);

    if (!product) {
        return ( 
            <div className="itemDetailPage">
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div className="itemDetailPage">
            <EditableProductItem id={product.id} name={product.name} price={product.price} stockQuantity={product.stockQuantity} />
        </div>
    )
};

export default ProductItemDetail;