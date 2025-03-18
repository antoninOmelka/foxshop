import { Product } from "@/types/product";
import styles from "./ProductItem.module.css";

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

export default ProductItem;