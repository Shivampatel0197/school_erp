import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";

export default function AdminDashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            </div>
            <StatsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <RevenueChart />
                <AttendanceChart />
            </div>
        </div>
    );
}
