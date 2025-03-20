import styles from "./ProductForm.module.css";
import { Product } from "@/types/product";
import { useState } from "react";

interface ProductFormProps {
    initialData: Omit<Product, "id">;
    onSubmit: (data: Omit<Product, "id">) => void;
    isEditing?: boolean;
    isSubmitting: boolean;
}

const ProductForm = ({ initialData, onSubmit, isEditing = false, isSubmitting }: ProductFormProps) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className={styles.productFormDetails} onSubmit={handleSubmit}>
            <label>Name</label>
            <input name="name" maxLength={40} value={formData.name} onChange={handleChange} required />

            <label>Price</label>
            <input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required />

            <label>Stock Quantity</label>
            <input name="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={handleChange} required />

            <button type="submit" disabled={isSubmitting}>{isEditing ? "Save" : "Create"}</button>
        </form>
    );
};

export default ProductForm;