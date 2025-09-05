"use client";
import { useState, useEffect } from "react";
import { gqlClient } from "@/services/graphql";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import { Product } from "../../generated/prisma";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: { getAllProducts: [Product] } = await gqlClient.request(GET_ALL_PRODUCTS);
        setProducts(data.getAllProducts || []);
      } catch (e) {
        console.error("Error fetching products:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);



  const optimisticCreate = (temp: Product) => setProducts((p) => [temp, ...p]);
  const confirmCreate = (tempId: string, confirmed: Product) =>
    setProducts((p) => p.map((prod) => (String(prod.id) === tempId ? confirmed : prod)));
  const rollbackCreate = (tempId: string) =>
    setProducts((p) => p.filter((prod) => String(prod.id) !== tempId));

  // Derived stats
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const inventoryValue = products.reduce(
    (acc, p) => acc + (Number(p.price) || 0) * (Number(p.stock) || 0),
    0
  );

  const categoryToStock: Record<string, number> = products.reduce(
    (acc: Record<string, number>, p) => {
      const key = String(p.category || "OTHERS");
      acc[key] = (acc[key] || 0) + (Number(p.stock) || 0);
      return acc;
    },
    {}
  );
  const categoryChartData = Object.entries(categoryToStock).map(
    ([name, value]) => ({ name, value })
  );

  return { products, loading, optimisticCreate, confirmCreate, rollbackCreate, lowStockCount, inventoryValue, categoryChartData };
}
