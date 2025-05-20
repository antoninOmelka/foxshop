"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "./services/products";
import { Product } from "@/types/product";
import ProductItem from "@/components/ProductItem/ProductItem";
import { z } from "zod";

const SearchFormSchema = z.object({
    name: z.string()
        .regex(/^[A-Za-z0-9\s-]*$/, "Name can only contain letters, numbers, spaces, and hyphens")
        .optional(),
    minStock: z.number()
        .min(0, "Minimal stock must be positive")
        .max(100000, "Minimal stock must be less than 100,000")
        .optional(),
    maxStock: z.number()
        .min(0, "Maximal stock must be positive")
        .max(100000, "Maximal stock must be less than 100,000")
        .optional(),
    includeInactive: z.boolean().optional(),
});

type SearchFormData = z.infer<typeof SearchFormSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [formData, setFormData] = useState<SearchFormData>({
    name: "",
    minStock: undefined,
    maxStock: undefined,
    includeInactive: undefined,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFormData, string>>>({});
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateField = (field: keyof SearchFormData, value: string | number | boolean | undefined): string | undefined => {
    try {
      SearchFormSchema.shape[field].parse(value);
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Invalid value";
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    let newValue: string | number | boolean | undefined = value;
    
    if (event.target.type === "number") {
      newValue = value === "" ? undefined : Number(value);
    } else if (name === "includeInactive") {
      newValue = value === "" ? undefined : value === "true";
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name as keyof SearchFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    let fieldValue: string | number | boolean | undefined = value;
    
    if (event.target.type === "number") {
      fieldValue = value === "" ? undefined : Number(value);
    } else if (name === "includeInactive") {
      fieldValue = value === "" ? undefined : value === "true";
    }
    
    const error = validateField(name as keyof SearchFormData, fieldValue);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const onSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const validatedData = SearchFormSchema.parse(formData);
      setIsSearching(true);
      const data = await getProducts(
        validatedData.name,
        validatedData.minStock,
        validatedData.maxStock,
        validatedData.includeInactive
      );
      setProducts(data);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof SearchFormData, string>> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof SearchFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return (
      <div className="item-detail-page">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <form className={styles.searchForm} onSubmit={onSearch} noValidate>
        <div className={styles.searchInput}>
          <label htmlFor="name">Name</label>
          <input 
            id="name"
            name="name"
            type="text"
            value={formData.name} 
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="minStock">Minimal Stock</label>
          <input 
            id="minStock"
            name="minStock"
            type="number"
            value={formData.minStock !== undefined ? formData.minStock : ""} 
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.minStock && <span className={styles.error}>{errors.minStock}</span>}
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="maxStock">Maximal Stock</label>
          <input 
            id="maxStock"
            name="maxStock"
            type="number"
            value={formData.maxStock !== undefined ? formData.maxStock : ""} 
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.maxStock && <span className={styles.error}>{errors.maxStock}</span>}
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="includeInactive">Include Inactive</label>
          <select 
            id="includeInactive"
            name="includeInactive"
            value={formData.includeInactive === undefined ? "" : formData.includeInactive.toString()}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">--</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.includeInactive && <span className={styles.error}>{errors.includeInactive}</span>}
        </div>
        <button disabled={isSearching} type="submit">Search</button>
      </form>
      <main className={styles.main}>
        <div className={styles.addButton}>
          <a href={`/products/new`}><button>Add new product</button></a>
        </div>
        {products.map((product: Product) => {
          return <ProductItem key={product.name + product.id} product={product} />
        })}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
