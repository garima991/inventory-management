"use client";

import React, { useState, useMemo, useContext } from "react";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useParams } from "next/navigation";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import AddSaleButton from "@/components/button/AddSaleButton";
import ProductSaleChart from "@/components/charts/ProductSaleChart";
import { aggregateSales } from "@/lib/utils/sales";
import { UserContext } from "@/contexts/UserContextProvider";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

const ProductDetailPage = () => {
  const params = useParams();
  const { user } = useContext(UserContext);
  const productId = params?.id as string | undefined;
  const { product, sales, loading, optimisticSale, rollbackSale } =
    useProductDetail(productId);

  const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("month");

  const chartData = useMemo(() => {
    return aggregateSales(
      sales.map((sale) => ({
        createdAt: String(sale.createdAt),
        quantity: sale.quantity,
      })),
      groupBy
    ).map(({ label, quantity }) => ({ date: label, quantity }));
  }, [sales, groupBy]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-400 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="px-6 py-8 min-h-screen">
      {/* Product Info Card */}
      <div className="mb-10 flex justify-center">
        <Card
          size="4"
          style={{ maxWidth:"950px", width: "100%" }}
          className="rounded-3xl border border-gray-800 shadow-xl  hover:shadow-2xl transition-shadow duration-300"
        >
          <Flex gap="6" align="start" className="flex flex-col md:flex-row">
            {/* Product Image */}
            <Box className="p-2 rounded-xl shadow-md flex-shrink-0 ">
              <img
                src={product?.imgUrl}
                alt={product?.title}
                className="w-full md:w-64 h-64 object-cover rounded-lg"
              />
            </Box>

            {/* Product Details */}
            <Box className="flex-1 flex flex-col gap-4 mt-4 md:mt-0">
              <Box className="flex flex-col gap-2">
                <Text
                  as="div"
                  size="7"
                  weight="bold"
                  className="text-slate-100"
                >
                  {product?.title}
                </Text>
                <Text as="div" size="3" className="text-slate-400">
                  Category: {product?.category}
                </Text>
                <Text
                  as="div"
                  size="6"
                  weight="bold"
                  className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  ${product?.price.toFixed(2)}
                </Text>
                <Text
                  as="p"
                  size="3"
                  className="mt-4 text-slate-300 leading-relaxed"
                >
                  {product?.description}
                </Text>
              </Box>

              {/* Stock Info */}
              <Text
                as="div"
                size="2"
                className={`mt-6 inline-block rounded px-3 py-1 text-sm font-medium ${
                  product?.stock > 0
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {product?.stock > 0
                  ? `${product?.stock} in stock`
                  : "Currently out of stock"}
              </Text>

              {/* Add Sale Button */}
              {product?.stock > 0 && (
                <div className="mt-4">
                  <AddSaleButton
                    product={product}
                    onOptimisticSale={optimisticSale}
                    onRollbackSale={rollbackSale}
                  />
                </div>
              )}
            </Box>
          </Flex>
        </Card>
      </div>

      {/* Sales Chart Card */}
      <div className="max-w-5xl mx-auto">
        <Card className="rounded-3xl border border-gray-800 p-6 shadow-xl  hover:shadow-2xl transition-shadow duration-300">
          <Flex justify="between" align="center" className="mb-6 flex-col md:flex-row gap-4 md:gap-0">
            <Text size="4" weight="bold" className="text-slate-100">
              Sales Overview
            </Text>

            <Select.Root value={groupBy} onValueChange={(val) => setGroupBy(val as any)}>
              <Select.Trigger
                className="inline-flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-slate-100 border border-gray-800 shadow-sm hover: focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              >
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md border border-gray-800 shadow-lg ">
                  <Select.Viewport>
                    {["day", "month", "year"].map((option) => (
                      <Select.Item
                        key={option}
                        value={option}
                        className="relative flex items-center px-8 py-2 text-sm bg-[#1F2123] text-slate-100 rounded cursor-pointer hover: focus: focus:outline-none transition-colors"
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
