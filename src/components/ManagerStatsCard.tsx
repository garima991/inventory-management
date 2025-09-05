"use client";
import { useProducts } from "@/hooks/useProducts";
import { useUsers } from "@/hooks/useUsers";
import React from "react";
import Card from "@/components/Card"

interface StatCard {
    label: string;
    value: number | string;
    loading: boolean;
}

const StatsCards = () => {
    const { products, loading, lowStockCount} = useProducts();

    const stats: StatCard[] = [
        { label: "Total Products", value: products.length, loading },
        { label: "Low Stock (≤5)", value: lowStockCount, loading },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <Card key={idx} stat={stat} />
            ))}
        </div>
    );
};

export default StatsCards;
