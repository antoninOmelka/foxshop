import styles from "./EditableProductItem.module.css"
import { Product } from "@/types/product";


const EditableProductItem = (product: Product) => {
    const {id, name, price, stockQuantity} = product;
    return (
        <div className={styles.productItem}>
            <h1>Product #{id}</h1>
            <div className={styles.productItemDetails}>
                <span>{`Name: ${name}`}</span>
                <span>{`Price: ${price}`}</span>
                <span>{`Stock quanity: ${stockQuantity}`}</span>
                <button>Save</button>
            </div>
        </div>
    )
}

export default EditableProductItem;