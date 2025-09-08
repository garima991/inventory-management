"use client";

import { useEffect, useState } from "react";
import { gqlClient } from "@/services/graphql";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../generated/prisma";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data: { getAllUsers: User[] } = await gqlClient.request(GET_ALL_USERS);
        setUsers(data.getAllUsers || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // -------- Optimistic Create --------
  function optimisticCreate(tempUser: User) {
    setUsers((prev) => [tempUser, ...prev]);
  }

  function confirmCreate(tempId: string, confirmed: User) {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(tempId) ? confirmed : u))
    );
  }

  function rollbackCreate(temp: User) {
    setUsers((prev) => prev.filter((u) => String(u.id) !== String(temp.id)));
  }

  // -------- Optimistic Edit --------
  function optimisticEdit(updated: User) {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(updated.id) ? updated : u))
    );
  }

  function rollbackEdit(original: User) {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(original.id) ? original : u))
    );
  }

  // -------- Optimistic Delete --------
  function optimisticDelete(id: string) {
    setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
  }

  function rollbackDelete(user: User) {
    setUsers((prev) => [user, ...prev]);
  }

  return {
    users,
    loading,

    // create
    optimisticCreate,
    confirmCreate,
    rollbackCreate,

    // edit
    optimisticEdit,
    rollbackEdit,

    // delete
    optimisticDelete,
    rollbackDelete,
  };
}
