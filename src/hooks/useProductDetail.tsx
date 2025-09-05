"use client";
import { useEffect, useState } from "react";
import { gqlClient } from "@/services/graphql";
import { GET_PRODUCT_BY_ID, GET_SALES_BY_PRODUCT } from "@/lib/gql/queries";
import { Product, Sale } from "../../generated/prisma";

export function useProductDetail(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    async function fetchData() {
      try {
        const [{ getProductById }, { getSalesByProduct }] = await Promise.all([
          gqlClient.request<{ getProductById: Product }>(GET_PRODUCT_BY_ID, { id: productId }),
          gqlClient.request<{ getSalesByProduct: Sale[] }>(GET_SALES_BY_PRODUCT, { productId }),
        ]);
        setProduct(getProductById);
        setSales(getSalesByProduct);
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId]);

  // Optimistic updates
  function optimisticSale(quantity: number, tempId: string) {
    if (!productId) return;
    const tempSale = {
      id: tempId,
      productId,
      quantity,
      createdAt: new Date().toISOString(),
    } as any;

    setProduct((p) => (p ? { ...p, stock: p.stock - quantity } : p));
    setSales((prev) => [tempSale, ...prev]);
  }

  function rollbackSale(quantity: number, tempId: string) {
    setProduct((p) => (p ? { ...p, stock: p.stock + quantity } : p));
    setSales((prev) => prev.filter((s) => String(s.id) !== tempId));
  }

  return { product, sales, loading, optimisticSale, rollbackSale };
}
