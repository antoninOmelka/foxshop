import styles from "./ProductItem.module.css";
import { memo } from "react";
import { Product } from "@/types/product";

interface ProductItemProps {
    product: Product
};

const ProductItem = ({ product }: ProductItemProps) => {
    const { id, name, price, stockQuantity } = product;

    return (
        <div className={styles.productItemContainer}>
            <span>{`Name: ${name}`}</span>
            <span>{`Price: ${price}`}</span>
            <span>{`Stock quanity: ${stockQuantity}`}</span>
            <div className={styles.editButton}>
                <a href={`/products/${id}`}><button>Edit</button></a>
            </div>
        </div>
    )
}

export default memo(ProductItem);