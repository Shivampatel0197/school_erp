"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Percent, DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export function StatsCards() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    const [counts, setCounts] = useState({ 
        students: 0, 
        teachers: 0, 
        attendanceRate: 0, 
        feesCollected: 0 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            if (!schoolId) return;
            setLoading(true);
            
            try {
                // 1. Students Count
                const { count: studentCount } = await supabase
                    .from('students')
                    .select('*', { count: 'exact', head: true })
                    .eq('school_id', schoolId);

                // 2. Teachers Count
                const { count: teacherCount } = await supabase
                    .from('teachers')
                    .select('*', { count: 'exact', head: true })
                    .eq('school_id', schoolId);

                // 3. Fee Collection (Total from payments)
                const { data: payments } = await supabase
                    .from('payments')
                    .select('amount_paid')
                    .eq('school_id', schoolId);
                
                const totalFees = payments?.reduce((acc, curr) => acc + (Number(curr.amount_paid) || 0), 0) || 0;

                // 4. Attendance Rate (Last 30 days average)
                const { data: attendance } = await supabase
                    .from('attendance')
                    .select('status')
                    .eq('school_id', schoolId);
                
                let rate = 0;
                if (attendance && attendance.length > 0) {
                    const presentCount = attendance.filter(a => a.status === 'present').length;
                    rate = (presentCount / attendance.length) * 100;
                }
                
                setCounts({
                    students: studentCount || 0,
                    teachers: teacherCount || 0,
                    attendanceRate: rate,
                    feesCollected: totalFees
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCounts();
    }, [schoolId]);

    const stats = [
        { 
            title: "Total Students", 
            value: loading ? "..." : counts.students.toString(), 
            description: "Live from database", 
            icon: Users 
        },
        { 
            title: "Total Teachers", 
            value: loading ? "..." : counts.teachers.toString(), 
            description: "Active faculty", 
            icon: GraduationCap 
        },
        { 
            title: "Attendance Rate", 
            value: loading ? "..." : `${counts.attendanceRate.toFixed(1)}%`, 
            description: counts.attendanceRate > 0 ? "Average attendance" : "No records yet", 
            icon: Percent 
        },
        { 
            title: "Fee Collection", 
            value: loading ? "..." : `₹${counts.feesCollected.toLocaleString()}`, 
            description: counts.feesCollected > 0 ? "Total collection" : "No payments yet", 
            icon: DollarSign 
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="hover:shadow-md transition-shadow cursor-default group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading && (stat.title.includes("Total") || stat.title.includes("Rate") || stat.title.includes("Fee")) ? (
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            ) : stat.value}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
