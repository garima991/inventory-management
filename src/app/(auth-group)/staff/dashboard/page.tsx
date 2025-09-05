import ProductsSection from "@/components/ProductsSection";
import StaffStatsCards from "@/components/StaffStatsCard";
import SalesByCategoryChart from "@/components/charts/SalesByCategoryChart";
import StockByCategoryChart from "@/components/charts/StocksByCategoryChart";

export default function StaffDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
     <StaffStatsCards/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ProductsSection />
        <div className="lg:col-span-4 space-y-6">
          <SalesByCategoryChart/>
          <StockByCategoryChart/>
        </div>
      </div>
    </div>
  );
}

