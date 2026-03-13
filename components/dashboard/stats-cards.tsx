"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Percent, DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function StatsCards() {
    const [counts, setCounts] = useState({ students: 0, teachers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
            const { count: teacherCount } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
            
            setCounts({
                students: studentCount || 0,
                teachers: teacherCount || 0
            });
            setLoading(false);
        }
        fetchCounts();
    }, []);

    const stats = [
        { title: "Total Students", value: loading ? "..." : counts.students.toString(), description: "Live from database", icon: Users },
        { title: "Total Teachers", value: loading ? "..." : counts.teachers.toString(), description: "Active faculty", icon: GraduationCap },
        { title: "Attendance Rate", value: "94.2%", description: "+1.2% this week", icon: Percent },
        { title: "Fee Collection", value: "₹42,500", description: "₹8,000 pending", icon: DollarSign },
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
                            {loading && stat.title.includes("Total") ? (
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

