"use client";
import React, { useState, useEffect } from "react";
import CreateUserButton from "./CreateUserButton";
import CreateProductButton from "./CreateProductButton";
import { gqlClient } from "@/services/graphql";
import {
  GET_ALL_USERS,
  GET_ALL_PRODUCTS,
  GET_SALES_BY_CATEGORY,
} from "@/lib/gql/queries";
import UserCard from "@/components/UserCard";
import ProductListSection from "@/components/ProductListSection";
import { User, Product } from "../../generated/prisma";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [userSearch, setUserSearch] = useState<string>("");
  const [categorySales, setCategorySales] = useState<
    Array<{ category: string; totalQuantity: number; totalRevenue: number }>
  >([]);
  const [salesLoading, setSalesLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data: { getAllUsers: [User] } = await gqlClient.request(
          GET_ALL_USERS
        );
        setUsers(data.getAllUsers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUsersLoading(false);
      }
    }

    async function getAllProducts() {
      try {
        const data: { getAllProducts: [Product] } =
          await gqlClient.request(GET_ALL_PRODUCTS);
        setProducts(data.getAllProducts || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    }

    async function getSalesByCategory() {
      try {
        const data: {
          getSalesByCategory: Array<{
            category: string;
            totalQuantity: number;
            totalRevenue: number;
          }>;
        } = await gqlClient.request(GET_SALES_BY_CATEGORY);
        setCategorySales(data.getSalesByCategory || []);
      } catch (error) {
        console.error("Error fetching sales by category:", error);
      } finally {
        setSalesLoading(false);
      }
    }

    getAllUsers();
    getAllProducts();
    getSalesByCategory();
  }, []);

  // Optimistic handlers
  function handleOptimisticUserCreate(tempUser: User) {
    setUsers((prev) => [tempUser, ...prev]);
  }
  function handleConfirmUserCreate(tempId: string, confirmed: User) {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(tempId) ? confirmed : u))
    );
  }
  function handleRollbackUserCreate(tempId: string) {
    setUsers((prev) => prev.filter((u) => String(u.id) !== String(tempId)));
  }

  function handleOptimisticProductCreate(tempProduct: Product) {
    setProducts((prev) => [tempProduct, ...prev]);
  }
  function handleConfirmProductCreate(tempId: string, confirmed: Product) {
    setProducts((prev) =>
      prev.map((p) => (String(p.id) === String(tempId) ? confirmed : p))
    );
  }
  function handleRollbackProductCreate(tempId: string) {
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(tempId)));
  }

  // Dashboard stats
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const inventoryValue = products.reduce(
    (acc, p) => acc + (Number(p.price) || 0) * (Number(p.stock) || 0),
    0
  );

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

  const filteredUsers = users.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      String(u.role)?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length, loading: productsLoading },
          { label: "Total Users", value: users.length, loading: usersLoading },
          { label: "Low Stock (≤5)", value: lowStockCount, loading: productsLoading },
          { label: "Inventory Value", value: `$${inventoryValue.toFixed(2)}`, loading: productsLoading },
        ].map((stat, idx) => (
          <div
            key={idx}
            className=" rounded-xl p-5 hover:scale-[1.02] transition"
          >
            <div className="text-sm opacity-70">{stat.label}</div>
            <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {stat.loading ? (
                <span className="inline-block h-8 w-20 rounded bg-white/10 animate-pulse" />
              ) : (
                stat.value
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 w-full  rounded-xl border border-white/10 p-5">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h1 className="text-lg font-semibold">Products</h1>
            <CreateProductButton
              onOptimisticCreate={handleOptimisticProductCreate}
              onServerConfirm={handleConfirmProductCreate}
              onErrorRollback={handleRollbackProductCreate}
            />
          </div>
          <ProductListSection products={products} loading={productsLoading} />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className=" rounded-xl border border-white/10 p-5">
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
                <h2 className="text-lg font-semibold">Users</h2>
                <CreateUserButton
                  onOptimisticCreate={handleOptimisticUserCreate}
                  onServerConfirm={handleConfirmUserCreate}
                  onErrorRollback={handleRollbackUserCreate}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name, email, username, role..."
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm placeholder-gray-400
                             focus:border-indigo-500/40 focus:ring focus:ring-indigo-500/20 outline-none"
                />
              </div>
            </div>
            {usersLoading ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-14 rounded-lg bg-white/10 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No users found.</p>
            )}
          </div>

          <div className=" rounded-xl border border-white/10 p-5">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
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

          <div className=" rounded-xl border border-white/10 p-5">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h2 className="text-lg font-semibold">Sales by Category</h2>
            </div>
            <div className="h-72">
              {salesLoading || categorySales.length === 0 ? (
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
