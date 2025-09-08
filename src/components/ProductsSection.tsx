"use client";
import React, { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import CreateProductButton from "@/components/button/CreateProductButton";
import Link from "next/link";

const ProductsSection = () => {
  const {
    products,
    loading,
    optimisticCreate,
    confirmCreate,
    rollbackCreate,
  } = useProducts();

  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");


  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; 

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(String(p.category || "Others")));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesQuery =
        q.length === 0
          ? true
          : String(p.title || "").toLowerCase().includes(q) ||
            String(p.category || "").toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : String(p.category || "Others") === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        list = list.sort(
          (a, b) => Number(a.price || 0) - Number(b.price || 0)
        );
        break;
      case "price-desc":
        list = list.sort(
          (a, b) => Number(b.price || 0) - Number(a.price || 0)
        );
        break;
      case "stock-asc":
        list = list.sort(
          (a, b) => Number(a.stock || 0) - Number(b.stock || 0)
        );
        break;
      case "stock-desc":
        list = list.sort(
          (a, b) => Number(b.stock || 0) - Number(a.stock || 0)
        );
        break;
      case "title-asc":
        list = list.sort((a, b) =>
          String(a.title || "").localeCompare(String(b.title || ""))
        );
        break;
      case "title-desc":
        list = list.sort((a, b) =>
          String(b.title || "").localeCompare(String(a.title || ""))
        );
        break;
      default:
        break;
    }

    return list;
  }, [products, query, selectedCategory, sortBy]);


  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginatedProducts = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 whenever filters or query change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, sortBy]);

  return (
    <div className="lg:col-span-8 rounded-xl border border-white/10 p-5">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
          <h2 className="text-lg font-semibold">Products</h2>
          <CreateProductButton
            onOptimisticCreate={optimisticCreate}
            onServerConfirm={confirmCreate}
            onErrorRollback={rollbackCreate}
          />
        </div>
      </div>

      <div>
        <div className="mb-4 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:max-w-xs rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400/60"
          />
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400/60"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400/60"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-desc">Stock: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
              <option value="title-asc">Title: A → Z</option>
              <option value="title-desc">Title: Z → A</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: itemsPerPage }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 glass-panel p-4 animate-pulse"
              >
                <div className="h-40 w-full rounded-lg bg-white/10" />
                <div className="mt-4 h-4 w-3/4 rounded bg-white/10" />
                <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paginatedProducts.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="no-underline"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded-lg border border-white/20 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg border ${
                    page === currentPage
                      ? "bg-indigo-500 text-white"
                      : "border-white/20"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border border-white/20 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 p-10 text-center opacity-80">
            No matching products. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;
