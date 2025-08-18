'use client'

import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import ManagerDashboard from "@/components/ManagerDashboard";
import StaffDashboard from "@/components/StaffDashboard";

export default function HomePage() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <main>
        {user?.role === "ADMIN" && <AdminDashboard />}
        {user?.role === "MANAGER" && <ManagerDashboard />}
        {user?.role === "STAFF" && <StaffDashboard />}
      </main>
    </div>
  );
}
