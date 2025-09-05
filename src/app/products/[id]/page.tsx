"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { gqlClient } from "@/services/graphql";
import { GET_PRODUCT_BY_ID, GET_SALES_BY_PRODUCT } from "@/lib/gql/queries";
import { Product, Sale } from "../../../../generated/prisma";
import { Box, Card, Flex, Text, Button } from "@radix-ui/themes";
import AddSaleButton from "@/components/AddSaleButton";
import ProductSaleChart from "@/components/ProductSaleChart";
import { aggregateSales } from "@/lib/utils"; 
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "@radix-ui/react-icons";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.id as string | undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("month");

  // Fetch product
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

  // Fetch sales
  const fetchSales = async () => {
    if (!productId) return;
    try {
      const { getSalesByProduct } = await gqlClient.request<{ getSalesByProduct: Sale[] }>(
        GET_SALES_BY_PRODUCT,
        { productId }
      );
      setSales(getSalesByProduct);
    } catch (err) {
      console.log("Error fetching sales:", err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [productId]);

  // Compute chart data
  const chartData = useMemo(() => {
    return aggregateSales(
      sales.map((sale) => ({
        createdAt: String(sale.createdAt),
        quantity: sale.quantity,
      })),
      groupBy
    ).map(({ label, quantity }) => ({
      date: label,
      quantity,
    }));
  }, [sales, groupBy]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        Loading product details...
      </div>
    );
  }

  const handleOptimisticSale = (productId: string, quantity: number, tempSaleId: string) => {
    const tempSale = {
      id: tempSaleId as any,
      productId,
      quantity: quantity as any,
      createdAt: new Date().toISOString() as any,
    } as any;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            stock: Number(prev.stock || 0) - quantity,
          }
        : prev
    );
    setSales((prev) => [tempSale, ...prev]);
  };

  const handleRollbackSale = (productId: string, quantity: number, tempSaleId: string) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            stock: Number(prev.stock || 0) + quantity,
          }
        : prev
    );
    setSales((prev) => prev.filter((s) => String(s.id) !== tempSaleId));
  };

  return (
    <div className="px-6 py-8 min-h-screen">
      
      <div className="mb-8 flex justify-center">
        <Card
          size="4"
          style={{ maxWidth: 900, width: "100%" }}
          className="rounded-2xl border border-slate-800 shadow-lg"
        >
          <Flex gap="6" align="start" direction={{ initial: "column", sm: "row" }}>
            
            <Box className="p-2 rounded-xl shadow-md flex-shrink-0">
              <img
                src={product.imgUrl}
                alt={product.title}
                className="w-64 h-64 object-cover rounded-lg"
              />
            </Box>

            
            <Box>
              <Text as="div" size="7" weight="bold" className="text-slate-100">
                {product.title}
              </Text>
              <Text as="div" size="3" className="text-slate-400 mt-1">
                Category: {product.category}
              </Text>
              <Text
                as="div"
                size="6"
                weight="bold"
                className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                ${product.price.toFixed(2)}
              </Text>

              <Text as="p" size="3" className="mt-4 text-slate-300 leading-relaxed">
                {product.description}
              </Text>

              <Text
                as="div"
                size="2"
                className={`mt-4 inline-block rounded px-2 py-1 text-xs font-medium ${
                  product.stock > 0
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
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
        <Card className="rounded-2xl border border-slate-800 p-6 shadow-lg">
          <Flex justify="between" align="center" className="mb-4">
           
            <Select.Root value={groupBy} onValueChange={(val) => setGroupBy(val as any)}>
              <Select.Trigger
                className="inline-flex items-center justify-between rounded-md px-3 py-1.5 text-sm  text-slate-100 border border-slate-700 shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md  border border-slate-700 shadow-lg">
                  <Select.Viewport className="p-1">
                    {["day", "month", "year"].map((option) => (
                      <Select.Item
                        key={option}
                        value={option}
                        className="relative flex items-center px-8 py-1.5 text-sm text-slate-100 rounded cursor-pointer hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
                      >
                        <Select.ItemText className="capitalize">{option}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </Flex>

          <ProductSaleChart data={chartData} />
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailPage;
