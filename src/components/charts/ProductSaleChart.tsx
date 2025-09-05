"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Flex, Text } from "@radix-ui/themes";

interface ProductSaleChartProps {
  data: { date: string; quantity: number }[];
}

export default function ProductSaleChart({ data }: ProductSaleChartProps) {
  return (
    <Card
      className="rounded-xl border border-white/40 p-4"
      size="3"
    >
     

      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
    
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />

            <XAxis
              dataKey="date"
              stroke="#cbd5e1"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />

            <YAxis
              stroke="#cbd5e1"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              axisLine={{ stroke: "#334155" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #3b82f6", 
                color: "#f1f5f9",
              }}
              itemStyle={{
                color: "#22d3ee", 
              }}
              labelStyle={{
                color: "#3b82f6", 
              }}
            />

           
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ fill: "blue", stroke: "#0f172a", r: 3 }}
              activeDot={{ r: 5, fill: "#3b82f6", stroke: "#22d3ee" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
