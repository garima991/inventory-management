import UsersSection from "@/components/UserSection";
import ProductsSection from "@/components/ProductsSection";
import ManagerStatsCards from "@/components/ManagerStatsCard";
import SalesByCategoryChart from "@/components/charts/SalesByCategoryChart";
import StockByCategoryChart from "@/components/charts/StocksByCategoryChart";

export default function ManagerDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
     <ManagerStatsCards/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ProductsSection />
        <div className="lg:col-span-4 space-y-6">
          <UsersSection />
          <SalesByCategoryChart/>
          <StockByCategoryChart/>
        </div>
      </div>
    </div>
  );
}

