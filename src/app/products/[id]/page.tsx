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
    <div className="px-6 py-8 min-h-screen bg-surface text-default">
      
      <div className="mb-10 flex justify-center">
        <Card
          size="4"
          style={{ maxWidth:"950px", width: "100%" }}
          className="rounded-3xl border border-default bg-surface shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <Flex gap="8" align="start" className="flex flex-col md:flex-row">

            <Box className="flex-shrink-0 w-full md:w-auto">
              <div className="relative overflow-hidden rounded-2xl border border-default bg-surface-2 shadow-sm md:w-72 md:h-72 w-full h-64">
                {product?.imgUrl ? (
                  <img
                    src={product.imgUrl}
                    alt={product?.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-muted">
                    No image
                  </div>
                )}
              </div>
            </Box>

            <Box className="flex-1 flex flex-col gap-5 mt-4 md:mt-0">
              <Box className="flex flex-col gap-2">
                <Text
                  as="div"
                  size="7"
                  weight="bold"
                  className="text-default"
                >
                  {product?.title}
                </Text>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-default bg-surface-2 px-3 py-1 text-xs text-muted">
                    {product?.category}
                  </span>
                </div>
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
                  className="mt-4 text-muted leading-relaxed"
                >
                  {product?.description}
                </Text>
              </Box>

              <Text
                as="div"
                size="2"
                className={`mt-2 inline-block rounded-full border px-3 py-1 text-sm font-medium ${
                  product?.stock > 0
                    ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-red-300/40 bg-red-500/10 text-red-600 dark:text-red-400"
                }`}
              >
                {product?.stock > 0
                  ? `${product?.stock} in stock`
                  : "Currently out of stock"}
              </Text>

              {product?.stock > 0 && (
                <div className="mt-4">
                  <AddSaleButton
                    product={product}
                    onOptimisticSale={optimisticSale}
                    onRollbackSale={rollbackSale}
                  />
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-default bg-surface-2 p-3">
                  <div className="text-xs text-muted">Price</div>
                  <div className="text-sm font-semibold text-default">${product?.price.toFixed(2)}</div>
                </div>
                <div className="rounded-lg border border-default bg-surface-2 p-3">
                  <div className="text-xs text-muted">Category</div>
                  <div className="text-sm font-semibold text-default">{product?.category}</div>
                </div>
                <div className="rounded-lg border border-default bg-surface-2 p-3">
                  <div className="text-xs text-muted">Product ID</div>
                  <div className="text-sm font-semibold text-default">{product?.id}</div>
                </div>
              </div>
            </Box>
          </Flex>
        </Card>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="rounded-3xl border border-default bg-surface p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Flex justify="between" align="center" className="mb-6 flex-col md:flex-row gap-4 md:gap-0">
            <Text size="4" weight="bold" className="text-default">
              Sales Overview
            </Text>

            <Select.Root value={groupBy} onValueChange={(val) => setGroupBy(val as any)}>
              <Select.Trigger
                className="inline-flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-default border border-default bg-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
              >
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md border border-default bg-surface-2 shadow-lg">
                  <Select.Viewport>
                    {["day", "month", "year"].map((option) => (
                      <Select.Item
                        key={option}
                        value={option}
                        className="relative flex items-center px-8 py-2 text-sm bg-surface-2 text-default rounded cursor-pointer hover:bg-surface focus:outline-none transition-colors"
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
