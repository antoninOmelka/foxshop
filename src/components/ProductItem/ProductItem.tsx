import styles from "./ProductItem.module.css";
import React from "react";
import { Product } from "@/types/product";

const ProductItem = (product: Product) => {
    const {id, name, price, stockQuantity} = product;

    return (
        <div className={styles.productItemContainer}>
            <span>{`Name: ${name}`}</span>
            <span>{`Price: ${price}`}</span>
            <span>{`Stock quanity: ${stockQuantity}`}</span>
            <a href={`/products/${id}`}><button>Edit</button></a>
        </div>
    )
}

export default React.memo(ProductItem);