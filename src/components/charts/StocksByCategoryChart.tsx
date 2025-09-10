"use client";
import { useProducts } from "@/hooks/useProducts";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const defaultPieColors = [
  "var(--chart-series-1, #6366f1)",
  "var(--chart-series-2, #ec4899)",
  "var(--chart-series-3, #22c55e)",
  "var(--chart-series-4, #f59e0b)",
  "var(--chart-series-5, #06b6d4)",
  "var(--chart-series-6, #8b5cf6)",
  "var(--chart-series-7, #ef4444)",
  "var(--chart-series-8, #14b8a6)",
];

const StockByCategoryChart = () => {
  const { loading, categoryChartData } = useProducts();

  const themeColors = {
    tooltipBg: "var(--chart-tooltip-bg, #ffffff)",
    tooltipText: "var(--chart-tooltip-text, #0f172a)",
    tooltipBorder: "var(--chart-axis, #64748b)",
    legendText: "var(--chart-axis, #64748b)",
    series: defaultPieColors,
  } as const;
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
                    fill={themeColors.series[index % themeColors.series.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: themeColors.tooltipBg,
                  borderRadius: "8px",
                  border: `1px solid ${themeColors.tooltipBorder}`,
                  color: themeColors.tooltipText,
                  padding: "8px 12px",
                }}
                itemStyle={{ color: themeColors.legendText }}
                labelStyle={{ color: themeColors.legendText }}
              />
              <Legend
                wrapperStyle={{
                  color: themeColors.legendText,
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
