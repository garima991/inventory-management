"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@radix-ui/themes";

interface ProductSaleChartProps {
  data: { date: string; quantity: number }[];
}

export default function ProductSaleChart({ data }: ProductSaleChartProps) {
 const colors = {
    axis: "var(--muted, #64748b)",
    grid: "var(--border, #e5e7eb)",
    line: "var(--accent, #6366f1)",
    dotFill: "var(--accent-fill, #6366f1)",
    dotStroke: "var(--surface, #ffffff)",
    tooltipBg: "var(--surface-2, #ffffff)",
    tooltipText: "var(--text, #0f172a)",
    tooltipBorder: "var(--accent, #6366f1)",
  };

  const axisTick = useMemo(() => ({ fill: colors.axis, fontSize: 12 }), [colors.axis]);

  return (
    <Card className="rounded-xl border border-default p-4 bg-surface" size="3">
      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />

            <XAxis dataKey="date" stroke={colors.axis} tick={axisTick} axisLine={{ stroke: colors.axis }} />

            <YAxis stroke={colors.axis} tick={axisTick} axisLine={{ stroke: colors.axis }} />

            <Tooltip
              contentStyle={{
                backgroundColor: colors.tooltipBg,
                borderRadius: "8px",
                padding: "10px",
                border: `1px solid ${colors.tooltipBorder}`,
                color: colors.tooltipText,
              }}
              itemStyle={{ color: colors.line }}
              labelStyle={{ color: colors.line }}
            />

            <Line
              type="monotone"
              dataKey="quantity"
              stroke={colors.line}
              strokeWidth={3}
              dot={{ fill: colors.dotFill, stroke: colors.dotStroke, r: 4 }}
              activeDot={{ r: 5, fill: colors.line, stroke: colors.dotStroke }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
