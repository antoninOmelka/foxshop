import styles from "./EditableProductItem.module.css"
import { Product } from "@/types/product";
import { useState } from "react";


const EditableProductItem = ({ id, name, price, stockQuantity }: Product) => {
    const [nameInput, setNameInput] = useState(name);
    const [priceInput, setPriceInput] = useState(price);
    const [quantityInput, setQuantityInput] = useState(stockQuantity);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className={styles.productItem}>
            <h1>Product #{id}</h1>
            <form className={styles.productItemDetails} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}></input>
                <label htmlFor="price">Price</label>
                <input id="price" type="number" value={priceInput} onChange={(e) => setPriceInput(Number(e.target.value))}></input>
                <label htmlFor="quantity">Stock Quantity</label>
                <input id="quantity" type="number" value={quantityInput} onChange={(e) => setQuantityInput(Number(e.target.value))}></input>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditableProductItem;