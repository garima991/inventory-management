import TenantDetail from "@/components/TenantDetail";
import UsersSection from "@/components/UserSection";

export default function SettingsPage (){
    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen">
            <h1 className="text-2xl font-semibold">Settings Page</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TenantDetail/>
                <UsersSection/>
            </div>
            
        </div>
    )
}