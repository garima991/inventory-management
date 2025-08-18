"use client";
import React, { useEffect, useState } from "react";
import { gqlClient } from "@/services/graphql";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import { Product } from "../../generated/prisma";
import ProductListSection from "./ProductListSection";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StaffDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const data: { getAllProducts: [Product] } = await gqlClient.request(
          GET_ALL_PRODUCTS
        );
        if (data.getAllProducts) {
          setProducts(data.getAllProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    }
    getAllProducts();
  }, []);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;

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
  const pieColors = [
    "#6366f1",
    "#ec4899",
    "#22c55e",
    "#f59e0b",
    "#06b6d4",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
  ];

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Total Products</div>
          <div className="mt-2 text-3xl font-semibold">
            {productsLoading ? (
              <span className="inline-block h-8 w-16 rounded bg-white/10 animate-pulse" />
            ) : (
              products.length
            )}
          </div>
        </div>
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Low Stock (≤5)</div>
          <div className="mt-2 text-3xl font-semibold">
            {productsLoading ? (
              <span className="inline-block h-8 w-16 rounded bg-white/10 animate-pulse" />
            ) : (
              lowStockCount
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 w-full shadow-sm p-5 glass-panel rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Products</h1>
          </div>
          <ProductListSection />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="shadow-sm p-5 glass-panel rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Stock by Category</h2>
            </div>
            <div className="h-72">
              {productsLoading || categoryChartData.length === 0 ? (
                <div className="h-full w-full rounded-lg bg-white/10 animate-pulse" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;


