import styles from "./ProductForm.module.css";
import { Product } from "@/types/product";
import { useState } from "react";
import { z } from "zod";

const ProductFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(40, "Name must be less than 40 characters")
        .regex(/^[A-Za-z0-9\s-]+$/, "Name can only contain letters, numbers, spaces, and hyphens"),
    price: z.number()
        .min(0, "Price must be positive")
        .max(1000000, "Price must be less than 1,000,000"),
    stockQuantity: z.number()
        .min(0, "Stock quantity must be positive")
        .max(100000, "Stock quantity must be less than 100,000")
});

type ProductFormData = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
    initialData: Omit<Product, "id">;
    onSubmit: (data: Omit<Product, "id" | "isActive">) => void;
    isEditing?: boolean;
    isSubmitting: boolean;
}

const ProductForm = ({ initialData, onSubmit, isEditing = false, isSubmitting }: ProductFormProps) => {
    const [formData, setFormData] = useState<ProductFormData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

    const validateField = (field: keyof ProductFormData, value: string | number): string | undefined => {
        try {
            ProductFormSchema.shape[field].parse(value);
            return undefined;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.errors[0].message;
            }
            return "Invalid value";
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const newValue = event.target.type === "number" ? Number(value) : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));

        if (errors[name as keyof ProductFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const fieldValue = event.target.type === "number" ? Number(value) : value;
        
        const error = validateField(name as keyof ProductFormData, fieldValue);
        setErrors(prev => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        
        try {
            const validatedData = ProductFormSchema.parse(formData);
            onSubmit(validatedData);
            setErrors({});
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
                error.errors.forEach(err => {
                    const field = err.path[0] as keyof ProductFormData;
                    newErrors[field] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <form className={styles.productFormDetails} onSubmit={handleSubmit} noValidate>
                <label>Name</label>
                <input 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <label>Price</label>
                <input 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.price && <span className={styles.error}>{errors.price}</span>}

                <label>Stock Quantity</label>
                <input 
                    name="stockQuantity" 
                    type="number" 
                    value={formData.stockQuantity} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.stockQuantity && <span className={styles.error}>{errors.stockQuantity}</span>}

            <button className={styles.formButton} type="submit" disabled={isSubmitting}>
                {isEditing ? "Save" : "Create"}
            </button>
        </form>
    );
};

export default ProductForm;