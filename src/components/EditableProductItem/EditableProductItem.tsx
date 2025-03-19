import styles from "./EditableProductItem.module.css"
import { deactivateProduct, updateProduct } from "@/app/services/products";
import { Product } from "@/types/product";
import { useState } from "react";


const EditableProductItem = ({ id, name, price, stockQuantity }: Product) => {
    const [formData, setFormData] = useState({id, name, price, stockQuantity });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await updateProduct(formData);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeactivate = async () => {
        try {
            await deactivateProduct(id);
            alert("Product deactivated successfully!");
        } catch (error) {
            console.error("Error deactivation product:", error);
            alert("Failed to deactivate product.");
        }
    };

    return (
        <div className={styles.productItem}>
            <h1>Product #{id}</h1>
            <form className={styles.productItemDetails} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange}></input>
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange}></input>
                <label htmlFor="quantity">Stock Quantity</label>
                <input id="quantity" name="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={handleChange}></input>
                <button type="submit">Save</button>
            </form>

            <button onClick={handleDeactivate}>Deactivate</button>
        </div>
    )
}

export default EditableProductItem;