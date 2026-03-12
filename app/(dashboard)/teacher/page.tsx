import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CalendarClock, ClipboardCheck } from "lucide-react";

export default function TeacherDashboardPage() {
    const stats = [
        { title: "My Classes", value: "3", description: "Grade 10, Grade 9", icon: Users },
        { title: "Pending Assignments", value: "14", description: "To be graded", icon: FileText },
        { title: "Classes Today", value: "4", description: "Next class in 30 mins", icon: CalendarClock },
        { title: "Attendance Taken", value: "2/3", description: "Grade 9 pending", icon: ClipboardCheck },
    ];

    const todaySchedule = [
        { time: "09:00 AM", class: "Grade 10 - A", subject: "Math" },
        { time: "11:00 AM", class: "Grade 9 - A", subject: "Math" },
        { time: "01:00 PM", class: "Grade 10 - B", subject: "Physics" },
        { time: "02:30 PM", class: "Grade 9 - B", subject: "Physics" },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {todaySchedule.map((schedule, i) => (
                                <div key={i} className="flex items-center p-3 border rounded-lg bg-slate-50">
                                    <div className="text-sm font-semibold w-24 border-r pr-4">{schedule.time}</div>
                                    <div className="flex items-center justify-between w-full pl-4">
                                        <span className="font-medium text-slate-800">{schedule.class}</span>
                                        <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700">{schedule.subject}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
