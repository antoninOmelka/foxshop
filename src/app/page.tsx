"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "./services/products";
import { Product } from "@/types/product";
import ProductItem from "@/components/ProductItem/ProductItem";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameInput, setNameInput] = useState<string>("");
  const [minStockInput, setMinStockInput] = useState<string>("");
  const [maxStockInput, setMaxStockInput] = useState<string>("");
  const [includeInactiveInput, setIncludeInactive] = useState<string>("");

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


  const onSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const nameQuery = nameInput.trim() || undefined;
    const minStockQuery = minStockInput ? Number(minStockInput) : undefined;
    const maxStockQuery = maxStockInput ? Number(maxStockInput) : undefined;
    const includeInactiveQuery = includeInactiveInput === "true" ? true : includeInactiveInput === "false" ? false : undefined;

    const data = await getProducts(nameQuery, minStockQuery, maxStockQuery, includeInactiveQuery);
    setProducts(data);
  };

  if (isLoading) {
    return (
        <div className="itemDetailPage">
            <p>Loading...</p>
        </div>
    )
}

  return (
    <div className={styles.page}>
      <form className={styles.searchForm} onSubmit={onSearch}>
        <div className={styles.searchInput}>
          <label htmlFor="name">Name</label>
          <input id="name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="minStock">Minimal Stock</label>
          <input id="minStock"
            type="number"
            value={minStockInput}
            onChange={(e) => setMinStockInput(e.target.value)}
          />
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="maxStock">Maximal Stock</label>
          <input id="maxStock"
            type="number"
            value={maxStockInput}
            onChange={(e) => setMaxStockInput(e.target.value)}
          />
        </div>
        <div className={styles.searchInput}>
          <label htmlFor="includeInactive">Include Inactive</label>
          <select id="inlcudeInactive"
            value={includeInactiveInput}
            onChange={(e) => setIncludeInactive(e.target.value)}
          >
            <option value={undefined}></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      <main className={styles.main}>
        <a href={`/products/new`}><button>Add new product</button></a>
        {products.map((product: Product) => {
          return <ProductItem key={product.name + product.id} product={product} />
        })}
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
