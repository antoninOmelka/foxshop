import { Product } from "@/types/product";
import ProductForm from "../ProductForm/ProductForm";
import { createProduct } from "@/app/services/products";
import { useState } from "react";

const NewProductItem = () => {
    const [formKey, setFormKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const handleSubmit = async (data: Omit<Product, "id">) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await createProduct(data);
            alert("Product created successfully!");
            setFormKey((prevKey) => prevKey + 1);
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Failed to create product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Create New Product</h1>
            <ProductForm key={formKey} initialData={{ name: "", price: 0, stockQuantity: 0, isActive: true }} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
};

export default NewProductItem;