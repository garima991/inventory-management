import UsersSection from "@/components/UserSection";
import ProductsSection from "@/components/ProductsSection";
import AdminStatsCards from "@/components/AdminStatsCard";
import SalesByCategoryChart from "@/components/charts/SalesByCategoryChart";
import StockByCategoryChart from "@/components/charts/StocksByCategoryChart";
import TopProductsChart from "@/components/charts/TopProductsChart";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
     <AdminStatsCards/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ProductsSection />
        <div className="lg:col-span-4 space-y-6">
          <StockByCategoryChart/>
          <TopProductsChart/>
          <SalesByCategoryChart/>
        </div>
      </div>
    </div>
  );
}

