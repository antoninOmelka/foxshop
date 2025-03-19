import styles from "./EditableProductItem.module.css"
import { deactivateProduct, updateProduct } from "@/app/services/products";
import { Product } from "@/types/product";
import ProductForm from "../ProductForm/ProductForm";


const EditableProductItem = ({ product }: { product: Product }) => {
    const handleSubmit = async (data: Omit<Product, "id">) => {
        try {
            await updateProduct({ id: product.id, ...data });
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeactivate = async (id: string) => {
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
            <h1>Edit Product #{product.id}</h1>
            <ProductForm initialData={product} onSubmit={handleSubmit} isEditing />
            <button onClick={() => handleDeactivate(product.id)}>Deactivate</button>
        </div>
    )
}

export default EditableProductItem;