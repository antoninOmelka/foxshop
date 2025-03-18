"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getAllProducts } from "./services/products";
import { Product } from "@/types/product";
import ProductItem from "@/components/ProductItem/ProductItem";

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch(error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {products.map((product: Product, index) => {
          return <ProductItem key={product.name + index} name={product.name} price={product.price} stockQuantity={product.stockQuantity} />
        })}
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
