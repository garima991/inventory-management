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

  // optimistic handlers
  function optimisticCreate(tempUser: User) {
    setUsers((prev) => [tempUser, ...prev]);
  }
  function confirmCreate(tempId: string, confirmed: User) {
    setUsers((prev) =>
      prev.map((u) => (String(u.id) === String(tempId) ? confirmed : u))
    );
  }
  function rollbackCreate(tempId: string) {
    setUsers((prev) => prev.filter((u) => String(u.id) !== String(tempId)));
  }

  return {
    users,
    loading,
    optimisticCreate,
    confirmCreate,
    rollbackCreate,
  };
}
