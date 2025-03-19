import { Product } from "@/types/product";
import ProductForm from "../ProductForm/ProductForm";
import { createProduct } from "@/app/services/products";

const NewProductItem = () => {
    const handleSubmit = async (data: Omit<Product, "id">) => {
        try {
            await createProduct(data);
            alert("Product created successfully!");
        } catch (error) {
            console.error("Failed to create product", error);
            alert("Failed to create product.");
        }
    };

    return (
        <div>
            <h1>Create New Product</h1>
            <ProductForm initialData={{ name: "", price: 0, stockQuantity: 0 }} onSubmit={handleSubmit} />
        </div>
    );
};

export default NewProductItem;