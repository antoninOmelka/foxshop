import styles from "./ProductItem.module.css";
import React from "react";
import { Product } from "@/types/product";

const ProductItem = (product: Product) => {
    const {name, price, stockQuantity} = product;

    return (
        <div className={styles.productItemContainer}>
            <span>{`Name: ${name}`}</span>
            <span>{`Price: ${price}`}</span>
            <span>{`Stock quanity: ${stockQuantity}`}</span>
        </div>
    )
}

export default React.memo(ProductItem);