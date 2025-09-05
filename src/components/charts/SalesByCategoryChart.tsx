"use client";
import { useSales } from "@/hooks/useSales";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


const SalesByCategoryChart = () => {
    const {categorySales, categorySalesLoading} = useSales();
  return (

    <div className="rounded-xl border border-white/10 p-5">
      <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
      <div className="w-full h-72">
        {categorySalesLoading || categorySales.length === 0 ? (
                <div className="h-full w-full rounded-lg bg-white/10 animate-pulse" />
              ) : (
        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={categorySales}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.12)"
                            />
                            <XAxis
                              dataKey="category"
                              stroke="#cbd5e1"
                              tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            />
                            <YAxis
                              stroke="#cbd5e1"
                              tick={{ fill: "#cbd5e1", fontSize: 12 }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#0f172a",
                                borderRadius: "8px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#f8fafc",
                                padding: "8px 12px",
                              }}
                              itemStyle={{ color: "#38bdf8" }}
                              labelStyle={{ color: "#facc15" }}
                            />
                            <Legend
                              wrapperStyle={{
                                color: "#cbd5e1",
                                fontSize: "12px",
                              }}
                            />
                            <Bar
                              dataKey="totalQuantity"
                              name="Quantity"
                              fill="#6366f1"
                              radius={[6, 6, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
              )}
      </div>
    </div>
  );
};

export default SalesByCategoryChart;
