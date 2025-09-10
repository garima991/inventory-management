"use client";
import React, { useMemo } from "react";
import { useSales } from "@/hooks/useSales";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopProductsChart = () => {
  const { topProducts, topProductsLoading } = useSales();

 const colors = {
    grid: "var(--chart-grid, #e5e7eb)",
    axis: "var(--chart-axis, #64748b)",
    tooltipBg: "var(--chart-tooltip-bg, #ffffff)",
    tooltipText: "var(--chart-tooltip-text, #0f172a)",
    tooltipBorder: "var(--chart-axis, #64748b)",
    bar: "var(--chart-series-3, #22c55e)",
  };

  const truncateLabel = (value: string, maxLength: number = 40) => {
    if (typeof value !== "string") return value;
    return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
  };

  return (
    <div className="rounded-xl border border-white/10 p-5">
      <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
      <div className="w-full h-72">
        {topProductsLoading || topProducts.length === 0 ? (
          <div className="h-full w-full rounded-lg bg-white/10 animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis type="number" stroke={colors.axis} tick={{ fill: colors.axis, fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="title"
                width={160}
                stroke={colors.axis}
                tick={{ fill: colors.axis, fontSize: 12 }}
                tickFormatter={(v: any) => truncateLabel(String(v))}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  borderRadius: "8px",
                  border: `1px solid ${colors.tooltipBorder}`,
                  color: colors.tooltipText,
                  padding: "8px 12px",
                  margin: "2px 10px",
                  fontSize: "12px",
                  maxWidth: "200px"
                }}
                itemStyle={{ color: colors.axis}}
                labelStyle={{ color: colors.axis, textWrap: "wrap"}}
              />
              <Bar dataKey="totalQuantity" name="Quantity" fill={colors.bar} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TopProductsChart;
