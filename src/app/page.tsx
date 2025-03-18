"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductItem from "@/components/Product/ProductItem";

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch("http://localhost:3000/products");
      const data = await request.json();
      setProducts(data);
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
