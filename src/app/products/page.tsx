import React from "react";
import CreateProductButton from "@/components/button/CreateProductButton";
import ProductsSection from "@/components/ProductsSection";

export default function ProductsPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
          <p className="opacity-70 mt-1">Manage your inventory, track stock and prices, and add new products.</p>
        </div>
        <CreateProductButton />
      </div>

      <ProductsSection />
    </div>
  );
}


