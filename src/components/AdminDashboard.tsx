"use client";
import React, { useState, useEffect } from "react";
import CreateUserButton from "./CreateUserButton";
import CreateProductButton from "./CreateProductButton";
import { gqlClient } from "@/services/graphql";
import { GET_ALL_USERS, GET_ALL_PRODUCTS, GET_SALES_BY_CATEGORY } from "@/lib/gql/queries";
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
  const [categorySales, setCategorySales] = useState<Array<{category: string; totalQuantity: number; totalRevenue: number}>>([]);
  const [salesLoading, setSalesLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data: { getAllUsers: [User] } = await gqlClient.request(GET_ALL_USERS);
        if (data.getAllUsers) {
          setUsers(data.getAllUsers);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUsersLoading(false);
      }
    }
    async function getAllProducts() {
      try {
        const data: { getAllProducts: [Product] } = await gqlClient.request(
          GET_ALL_PRODUCTS
        );
        if (data.getAllProducts) {
          setProducts(data.getAllProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    }

    getAllUsers();
    getAllProducts();
    async function getSalesByCategory() {
      try {
        const data: { getSalesByCategory: Array<{category: string; totalQuantity: number; totalRevenue: number}> } = await gqlClient.request(
          GET_SALES_BY_CATEGORY
        );
        setCategorySales(data.getSalesByCategory || []);
      } catch (error) {
        console.error("Error fetching sales by category:", error);
      } finally {
        setSalesLoading(false);
      }
    }
    getSalesByCategory();
  }, []);

  function handleOptimisticUserCreate(tempUser: User) {
    setUsers((prev) => [tempUser, ...prev]);
  }

  function handleConfirmUserCreate(tempId: string, confirmed: User) {
    setUsers((prev) => prev.map(u => String(u.id) === String(tempId) ? confirmed : u));
  }

  function handleRollbackUserCreate(tempId: string) {
    setUsers((prev) => prev.filter(u => String(u.id) !== String(tempId)));
  }

  function handleOptimisticProductCreate(tempProduct: Product) {
    setProducts((prev) => [tempProduct, ...prev]);
  }

  function handleConfirmProductCreate(tempId: string, confirmed: Product) {
    setProducts((prev) => prev.map(p => String(p.id) === String(tempId) ? confirmed : p));
  }

  function handleRollbackProductCreate(tempId: string) {
    setProducts((prev) => prev.filter(p => String(p.id) !== String(tempId)));
  }

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
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Total Products</div>
          <div className="mt-2 text-3xl font-semibold">
            {productsLoading ? (
              <span className="inline-block h-8 w-16 rounded bg-white/10 animate-pulse" />
            ) : (
              products.length
            )}
          </div>
        </div>
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Total Users</div>
          <div className="mt-2 text-3xl font-semibold">
            {usersLoading ? (
              <span className="inline-block h-8 w-16 rounded bg-white/10 animate-pulse" />
            ) : (
              users.length
            )}
          </div>
        </div>
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Low Stock (≤5)</div>
          <div className="mt-2 text-3xl font-semibold">
            {productsLoading ? (
              <span className="inline-block h-8 w-16 rounded bg-white/10 animate-pulse" />
            ) : (
              lowStockCount
            )}
          </div>
        </div>
        <div className="glass-panel rounded-xl border border-white/10 p-5">
          <div className="text-sm opacity-70">Inventory Value</div>
          <div className="mt-2 text-3xl font-semibold">
            {productsLoading ? (
              <span className="inline-block h-8 w-24 rounded bg-white/10 animate-pulse" />
            ) : (
              `$${inventoryValue.toFixed(2)}`
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 w-full shadow-sm p-5 glass-panel rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
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
          <div className="shadow-sm p-5 glass-panel rounded-xl border border-white/10">
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-between gap-3">
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
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/20 text-sm"
                />
              </div>
            </div>
            {usersLoading ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-14 rounded-lg bg-white/10 animate-pulse" />
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

          <div className="shadow-sm p-5 glass-panel rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
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
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="shadow-sm p-5 glass-panel rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sales by Category</h2>
            </div>
            <div className="h-72">
              {salesLoading || categorySales.length === 0 ? (
                <div className="h-full w-full rounded-lg bg-white/10 animate-pulse" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categorySales} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                    <XAxis dataKey="category" stroke="currentColor" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
                    <YAxis stroke="currentColor" tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalQuantity" name="Quantity" fill="#6366f1" />
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
