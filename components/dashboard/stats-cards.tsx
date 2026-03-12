import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Percent, DollarSign } from "lucide-react";

export function StatsCards() {
    const stats = [
        { title: "Total Students", value: "1,245", description: "+4 from last month", icon: Users },
        { title: "Total Teachers", value: "86", description: "All active", icon: GraduationCap },
        { title: "Attendance Rate", value: "94.2%", description: "+1.2% this week", icon: Percent },
        { title: "Fee Collection", value: "$42,500", description: "$8,000 pending", icon: DollarSign },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
