"use client";
import { useProducts } from "@/hooks/useProducts";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

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

const StockByCategoryChart = () => {
  const { loading, categoryChartData } = useProducts();
  return (
    <div className="rounded-xl border border-white/10 p-5">
      <h2 className="text-lg font-semibold mb-4">Stock by Category</h2>
      <div className="w-full h-72">
        {loading || categoryChartData.length === 0 ? (
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
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f8fafc",
                  padding: "8px 12px",
                }}
                itemStyle={{ color: "#facc15" }}
                labelStyle={{ color: "#38bdf8" }}
              />
              <Legend
                wrapperStyle={{
                  color: "#cbd5e1",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockByCategoryChart;
