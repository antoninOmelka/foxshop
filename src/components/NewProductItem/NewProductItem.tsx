import { Product } from "@/types/product";
import ProductForm from "../ProductForm/ProductForm";

const NewProductItem = () => {
    const handleSubmit = async (data: Omit<Product, "id">) => {
        console.log(data);
        //await createProduct(data);
    };

    return (
        <div>
            <h1>Create New Product</h1>
            <ProductForm initialData={{ name: "", price: 0, stockQuantity: 0 }} onSubmit={handleSubmit} />
        </div>
    );
};

export default NewProductItem;