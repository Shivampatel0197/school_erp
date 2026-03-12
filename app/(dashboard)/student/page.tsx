import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckSquare, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
    const stats = [
        { title: "Attendance", value: "95%", description: "Present 42 out of 45 days", icon: ClipboardCheck },
        { title: "Assignments Due", value: "3", description: "2 due this week", icon: CheckSquare },
        { title: "Upcoming Exams", value: "1", description: "Midterms in 12 days", icon: BookOpen },
        { title: "Library Books", value: "0", description: "All clear", icon: BookOpen },
    ];

    const timetable = [
        { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Doe", room: "Room 101" },
        { time: "10:00 AM", subject: "Physics", teacher: "Ms. Smith", room: "Room 102" },
        { time: "11:30 AM", subject: "English Lit", teacher: "Mr. Adams", room: "Room 104" },
        { time: "01:00 PM", subject: "Computer Science", teacher: "Dr. Turing", room: "Lab A" },
    ];

    const assignments = [
        { title: "Algebra Chapter 5 Practice", subject: "Mathematics", due: "Tomorrow" },
        { title: "Newton's Laws Essay", subject: "Physics", due: "Friday" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back, Alice. Here's your overview for today.</p>
                </div>
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Today's Timetable</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {timetable.map((period, i) => (
                                <div key={i} className="flex items-center p-3 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <div className="text-sm font-bold w-24 border-r pr-4 text-slate-700">{period.time}</div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full pl-4 gap-2">
                                        <div>
                                            <div className="font-semibold text-slate-900">{period.subject}</div>
                                            <div className="text-xs text-muted-foreground">with {period.teacher}</div>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-white border self-start md:self-auto">{period.room}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckSquare className="h-5 w-5" /> Pending Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {assignments.map((assignment, i) => (
                                <div key={i} className="flex flex-col border-b last:border-0 pb-4 last:pb-0">
                                    <div className="font-semibold">{assignment.title}</div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                            {assignment.subject}
                                        </span>
                                        <span className="text-sm text-red-500 font-medium tracking-tight flex items-center gap-1">
                                            Due {assignment.due}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">View All Assignments <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
