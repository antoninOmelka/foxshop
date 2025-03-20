import styles from "./EditableProductItem.module.css"
import { deactivateProduct, updateProduct } from "@/app/services/products";
import { Product } from "@/types/product";
import ProductForm from "../ProductForm/ProductForm";
import { useState } from "react";


const EditableProductItem = ({ product }: { product: Product }) => {
    const [isActive, setIsActive] = useState<boolean>(product.isActive);
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: Omit<Product, "id">) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await updateProduct({ id: product.id, ...data });
            alert("Product edited successfully!");
        } catch (error) {
            console.error("Failed to edit product:", error);
            alert("Failed to edit product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeactivate = async (id: string) => {
        if (isDeactivating) return;
        setIsDeactivating(true);

        try {
            await deactivateProduct(id);
            setIsActive(false);
            alert("Product deactivated successfully!");
        } catch (error) {
            console.error("Error deactivating product:", error);
            alert("Failed to deactivate product.");
        } finally {
            setIsDeactivating(false);
        }
    };

    const isDeactivable = () => {
        return !isActive || isDeactivating || isSubmitting;
    };

    const isDisabled = () => {
        return isDeactivating || isSubmitting;
    }

    return (
        <div className={styles.productItem}>
            <h1>Edit Product #{product.id}</h1>
            <ProductForm initialData={product} onSubmit={handleSubmit} isEditing isSubmitting={isDisabled()}/>
            <button disabled={isDeactivable()} onClick={() => handleDeactivate(product.id)}>
                {isDeactivating ? "Deactivating..." : "Deactivate"}
            </button>
        </div>
    );
};

export default EditableProductItem;
