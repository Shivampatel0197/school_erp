"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export function RevenueChart() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRevenue() {
            if (!schoolId) return;
            setLoading(true);
            
            const { data: payments } = await supabase
                .from('payments')
                .select('amount_paid, payment_date')
                .eq('school_id', schoolId)
                .order('payment_date', { ascending: true });

            if (payments && payments.length > 0) {
                // Group by month
                const monthlyData: Record<string, number> = {};
                payments.forEach(p => {
                    const date = new Date(p.payment_date);
                    const month = date.toLocaleString('default', { month: 'short' });
                    monthlyData[month] = (monthlyData[month] || 0) + (Number(p.amount_paid) || 0);
                });

                const formatted = Object.entries(monthlyData).map(([name, revenue]) => ({ name, revenue }));
                setChartData(formatted);
            } else {
                // Show empty months if no data
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
                setChartData(months.map(m => ({ name: m, revenue: 0 })));
            }
            setLoading(false);
        }
        fetchRevenue();
    }, [schoolId]);

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Revenue Insights</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                         <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: "transparent" }}
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Bar dataKey="revenue" fill="#0f172a" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
