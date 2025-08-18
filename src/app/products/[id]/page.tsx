"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { gqlClient } from "@/services/graphql";
import { GET_PRODUCT_BY_ID } from "@/lib/gql/queries";
import { Product } from "../../../../generated/prisma";
import { Box, Card, Flex, Text, Button } from "@radix-ui/themes";
import AddSaleButton from "@/components/AddSaleButton";
import ProductSaleChart from "@/components/ProductSaleChart";

const ProductDetailPage = () => {

  const params = useParams();
  const productId = params?.id as string | undefined;

  const [product, setProduct] = useState<Product | null>(null);

  
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const { getProductById } = await gqlClient.request<{ getProductById: Product }>(
          GET_PRODUCT_BY_ID,
          { id: productId }
        );
        setProduct(getProductById);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const chartData = useMemo(() => {
    if (!product?.sales) return [];

    const salesByDate: Record<string, number> = {};

    for (const sale of product.sales) {
      const d = new Date(sale.createdAt as any);
      if (isNaN(d.getTime())) continue;

      const key = d.toISOString().split("T")[0]; // yyyy-mm-dd
      salesByDate[key] = (salesByDate[key] || 0) + Number(sale.quantity || 0);
    }

    return Object.entries(salesByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, quantity]) => ({
        date: new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          timeZone: "Asia/Kolkata",
        }),
        quantity,
      }));
  }, [product]);


  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading product details...
      </div>
    );
  }


  const handleOptimisticSale = (productId: string, quantity: number, tempSaleId: string) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            stock: Number(prev.stock || 0) - quantity,
            sales: [
              {
                id: tempSaleId as any,
                productId,
                quantity: quantity as any,
                createdAt: new Date().toISOString() as any,
              } as any,
              ...(prev.sales || []),
            ],
          }
        : prev
    );
  };

  const handleRollbackSale = (productId: string, quantity: number, tempSaleId: string) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            stock: Number(prev.stock || 0) + quantity,
            sales: (prev.sales || []).filter((s) => String(s.id) !== tempSaleId),
          }
        : prev
    );
  };

  return (
    <div className="px-6 py-6">
      {/* product UI same as before */}
      <div className="mb-6 flex justify-center">
        <Card
          size="4"
          style={{ maxWidth: 900, width: "100%" }}
          className="rounded-xl border border-white/10"
        >
          <Flex gap="6" align="start" direction={{ initial: "column", sm: "row" }}>
            <Box style={{ flexShrink: 0 }}>
              <img
                src={product.imgUrl}
                alt={product.title}
                className="w-64 h-64 object-cover rounded-lg shadow"
              />
            </Box>

            <Box>
              <Text as="div" size="6" weight="bold">
                {product.title}
              </Text>
              <Text as="div" size="3" className="opacity-70">
                Category: {product.category}
              </Text>
              <Text
                as="div"
                size="5"
                weight="bold"
                className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
              >
                ${product.price.toFixed(2)}
              </Text>

              <Text as="p" size="3" className="mt-4 opacity-90">
                {product.description}
              </Text>

              <Text
                as="div"
                size="2"
                className={`mt-4 ${product.stock > 0 ? "text-foreground/70" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Currently out of stock"}
              </Text>

              <div className="mt-4">
                {product.stock > 0 ? (
                  <AddSaleButton
                    product={product}
                    onOptimisticSale={handleOptimisticSale}
                    onRollbackSale={handleRollbackSale}
                  />
                ) : (
                  <Button size="3" disabled className="mt-1" variant="soft">
                    Out of Stock
                  </Button>
                )}
              </div>
            </Box>
          </Flex>
        </Card>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="rounded-xl border border-white/10">
          <div className="h-80">
            <ProductSaleChart data={chartData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
