"use client";
import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";
import CreateUserButton from "@/components/button/UserDialogButton";

const UsersSection = () => {
  const {
    users,
    loading,
    optimisticCreate,
    confirmCreate,
    rollbackCreate,
  } = useUsers();

  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      String(u.role)?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="rounded-xl border border-white/10 p-5">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
          <h2 className="text-lg font-semibold">User Management</h2>
          <CreateUserButton
            mode = "create"
            onOptimisticCreate={optimisticCreate}
            onServerConfirm={confirmCreate}
            onErrorRollback={rollbackCreate}
          />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-14 rounded-lg bg-white/10 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default UsersSection;
