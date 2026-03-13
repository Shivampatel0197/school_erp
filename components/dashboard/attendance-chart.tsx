"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export function AttendanceChart() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAttendance() {
            if (!schoolId) return;
            setLoading(true);
            
            const { data: attendance } = await supabase
                .from('attendance')
                .select('status, date')
                .eq('school_id', schoolId)
                .order('date', { ascending: true })
                .limit(30);

            if (attendance && attendance.length > 0) {
                // Group by day for the chart
                const dailyData: Record<string, { total: number, present: number }> = {};
                attendance.forEach(a => {
                    const day = new Date(a.date).toLocaleDateString('default', { weekday: 'short' });
                    if (!dailyData[day]) dailyData[day] = { total: 0, present: 0 };
                    dailyData[day].total++;
                    if (a.status === 'present') dailyData[day].present++;
                });

                const formatted = Object.entries(dailyData).map(([day, counts]) => ({
                    day,
                    rate: (counts.present / counts.total) * 100
                }));
                setChartData(formatted);
            } else {
                // Fallback for new schools
                const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
                setChartData(days.map(d => ({ day: d, rate: 0 })));
            }
            setLoading(false);
        }
        fetchAttendance();
    }, [schoolId]);

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Weekly Attendance Flow</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                         <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
