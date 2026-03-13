"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckSquare, ClipboardCheck, ArrowRight, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function StudentDashboardPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [stats, setStats] = useState({ attendance: 0, assignments: 0, exams: 0 });
    const [timetable, setTimetable] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStudentData() {
            if (!schoolId) return;
            setLoading(true);
            
            try {
                // 1. Attendance Rate for school
                const { data: attendanceData } = await supabase
                    .from('attendance')
                    .select('status')
                    .eq('school_id', schoolId);
                
                let rate = 0;
                if (attendanceData && attendanceData.length > 0) {
                    const present = attendanceData.filter(a => a.status === 'present').length;
                    rate = (present / attendanceData.length) * 100;
                }

                // 2. Pending Assignments for school
                const { data: assignmentData } = await supabase
                    .from('assignments')
                    .select('*, subjects(name)')
                    .eq('school_id', schoolId)
                    .order('due_date', { ascending: true })
                    .limit(3);

                // 3. Timetable for school
                const { data: timetableData } = await supabase
                    .from('timetable')
                    .select('*, subjects(name), teachers(name)')
                    .eq('school_id', schoolId)
                    .limit(5);

                setStats({
                    attendance: rate,
                    assignments: assignmentData?.length || 0,
                    exams: 0 
                });
                
                if (assignmentData) setAssignments(assignmentData);
                if (timetableData) setTimetable(timetableData);
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStudentData();
    }, [schoolId]);

    const statCards = [
        { title: "Attendance", value: `${stats.attendance.toFixed(1)}%`, description: "Average rate", icon: ClipboardCheck },
        { title: "Assignments Due", value: stats.assignments.toString(), description: "Pending tasks", icon: CheckSquare },
        { title: "Upcoming Exams", value: "0", description: "Stay prepared", icon: BookOpen },
        { title: "Library Books", value: "0", description: "All clear", icon: BookOpen },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">STUDENT DASHBOARD</h2>
                    <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest mt-1">Welcome back, {user?.firstName}. Keep exploring your progress.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">
                                {loading ? <Loader2 className="h-5 w-5 animate-spin text-slate-200" /> : stat.value}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 italic opacity-70">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 mt-8">
                <Card className="col-span-1 lg:col-span-4 rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
                        <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                            <div className="p-2 rounded-2xl bg-primary/10 text-primary">
                                <Calendar className="h-5 w-5" /> 
                            </div>
                            Today&apos;s Timetable
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {loading ? (
                            <div className="flex h-48 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                        ) : timetable.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                                <Info className="h-10 w-10 text-slate-200 mb-3" />
                                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No classes found labels for your school.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {timetable.map((period, i) => (
                                    <div key={i} className="flex items-center p-4 rounded-3xl bg-slate-50 hover:bg-slate-100/50 transition-all border-2 border-transparent">
                                        <div className="text-sm font-black w-24 border-r-2 border-slate-200 pr-4 text-slate-700 uppercase tracking-tighter">
                                            {period.start_time?.slice(0, 5)}
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between w-full pl-6 gap-2">
                                            <div>
                                                <div className="font-black text-slate-900 text-lg uppercase tracking-tight italic">{period.subjects?.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase italic">Instructor: {period.teachers?.name || 'TBA'}</div>
                                            </div>
                                            <span className="text-[10px] font-black px-4 py-2 rounded-xl bg-white border-2 border-slate-100 shadow-sm self-start md:self-auto uppercase">ROOM 102</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-3 rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
                        <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                            <div className="p-2 rounded-2xl bg-amber-100 text-amber-600">
                                <CheckSquare className="h-5 w-5" />
                            </div>
                            Assignments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {loading ? (
                            <div className="flex h-48 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                        ) : assignments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 bg-amber-50/30 rounded-3xl border-2 border-dashed border-amber-100">
                                <Info className="h-10 w-10 text-amber-200 mb-3" />
                                <p className="text-amber-400 font-black uppercase tracking-widest text-[10px]">No pending assignments found labels.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {assignments.map((assignment, i) => (
                                    <div key={i} className="flex flex-col border-b border-slate-50 last:border-0 pb-6 last:pb-0 group">
                                        <div className="font-black text-slate-900 text-lg uppercase tracking-tighter hover:text-primary transition-colors cursor-pointer">{assignment.title}</div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full uppercase tracking-widest italic">
                                                {assignment.subjects?.name}
                                            </span>
                                            <span className="text-[10px] text-red-500 font-black tracking-widest uppercase flex items-center gap-1 italic">
                                                DUE {new Date(assignment.due_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <Link href="/student/assignments" className="block w-full">
                                    <Button variant="outline" className="w-full mt-2 h-14 rounded-2xl border-2 font-black uppercase tracking-widest group">
                                        All Tasks <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
