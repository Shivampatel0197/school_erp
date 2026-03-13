"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CalendarClock, ClipboardCheck, Loader2, Info } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function TeacherDashboardPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [counts, setCounts] = useState({ classes: 0, students: 0, assignments: 0 });
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeacherStats() {
            if (!schoolId) return;
            setLoading(true);
            
            try {
                // 1. My Classes Count (Filtering by school_id)
                const { count: classCount } = await supabase
                    .from('classes')
                    .select('*', { count: 'exact', head: true })
                    .eq('school_id', schoolId);

                // 2. All Students Count for this school
                const { count: studentCount } = await supabase
                    .from('students')
                    .select('*', { count: 'exact', head: true })
                    .eq('school_id', schoolId);

                // 3. Pending Assignments for this school
                const { count: assignmentCount } = await supabase
                    .from('assignments')
                    .select('*', { count: 'exact', head: true })
                    .eq('school_id', schoolId);

                // 4. Today's Timetable
                const { data: timetableData } = await supabase
                    .from('timetable')
                    .select('*, classes(name, section), subjects(name)')
                    .eq('school_id', schoolId)
                    .order('start_time', { ascending: true });
                
                setCounts({
                    classes: classCount || 0,
                    students: studentCount || 0,
                    assignments: assignmentCount || 0
                });
                
                if (timetableData) setSchedule(timetableData);
            } catch (error) {
                console.error("Error fetching teacher stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeacherStats();
    }, [schoolId]);

    const stats = [
        { title: "Classes", value: loading ? "..." : counts.classes.toString(), description: "Active sections", icon: Users },
        { title: "Students", value: loading ? "..." : counts.students.toString(), description: "Under your care", icon: Users },
        { title: "Assignments", value: loading ? "..." : counts.assignments.toString(), description: "Total published", icon: FileText },
        { title: "Classes Today", value: loading ? "..." : schedule.length.toString(), description: "Scheduled periods", icon: CalendarClock },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">Teacher Dashboard</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-xl transition-all border-none bg-white rounded-3xl shadow-sm group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">
                                {loading ? <Loader2 className="h-6 w-6 animate-spin text-slate-200" /> : stat.value}
                            </div>
                            <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter italic">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <Card className="col-span-1 lg:col-span-4 rounded-3xl border-none bg-white shadow-sm h-fit">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                            <CalendarClock className="h-6 w-6 text-primary" /> Today&apos;s Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {loading ? (
                            <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                        ) : schedule.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                                <Info className="h-10 w-10 text-slate-200 mb-2" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No classes scheduled today</p>
                                <p className="text-slate-300 text-[10px] mt-1 italic">Contact admin for timetable updates</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {schedule.map((session, i) => (
                                    <div key={i} className="flex items-center p-4 rounded-3xl bg-slate-50 hover:bg-slate-100/50 transition-all border-2 border-transparent hover:border-slate-100">
                                        <div className="text-lg font-black w-24 border-r-2 border-slate-200 pr-6 mr-6 tracking-tighter text-slate-700">
                                            {session.start_time.slice(0, 5)}
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <div className="font-black text-slate-900 tracking-tight text-lg underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all">
                                                    {session.classes?.name} - {session.classes?.section}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Primary Classroom</div>
                                            </div>
                                            <span className="text-xs font-black px-4 py-1.5 rounded-full bg-primary/10 text-primary border-2 border-primary/10 shadow-lg shadow-primary/5 uppercase tracking-tighter italic">
                                                {session.subjects?.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
