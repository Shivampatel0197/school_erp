"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Save, Loader2, Info, GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function TeacherAttendancePage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [students, setStudents] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchStudents() {
            if (!schoolId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('school_id', schoolId)
                .order('first_name', { ascending: true });
            
            if (data) setStudents(data);
            setLoading(false);
        }
        fetchStudents();
    }, [schoolId]);

    const handleMark = (id: string, status: string) => {
        setAttendance((prev) => ({ ...prev, [id]: status.toLowerCase() }));
    };

    const handleSubmit = async () => {
        if (Object.keys(attendance).length === 0 || !schoolId) return;
        setSaving(true);
        
        const records = Object.entries(attendance).map(([studentId, status]) => ({
            student_id: studentId,
            status,
            school_id: schoolId,
            date: new Date().toISOString().split('T')[0],
            class_id: students.find(s => s.id === studentId)?.class_id || null
        }));

        const { error } = await supabase.from('attendance').upsert(records);
        if (!error) alert("Attendance submitted successfully!");
        setSaving(false);
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Attendance Protocol</h2>
                    <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest mt-1 opacity-70 italic flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Live Session | {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <Button 
                    onClick={handleSubmit} 
                    disabled={saving || Object.keys(attendance).length === 0}
                    className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-primary shadow-xl shadow-primary/20 group"
                >
                    {saving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />} 
                    Finalize Submission
                </Button>
            </div>

            <div className="rounded-[40px] border-none bg-white mt-10 overflow-hidden shadow-2xl shadow-slate-100/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="h-16 border-b-2 border-slate-100/50">
                            <TableHead className="w-[100px] font-black uppercase tracking-widest text-[10px] pl-8">Admission</TableHead>
                            <TableHead className="font-black uppercase tracking-widest text-[10px]">Student Identity</TableHead>
                            <TableHead className="text-right font-black uppercase tracking-widest text-[10px] pr-8">Status Configuration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-64 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></TableCell>
                            </TableRow>
                        ) : students.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center italic opacity-30">
                                        <GraduationCap className="h-12 w-12 mb-3" />
                                        <p className="text-sm font-black uppercase tracking-[0.2em]">Zero Records Found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : students.map((student) => (
                            <TableRow key={student.id} className="h-24 hover:bg-slate-50 border-b border-slate-50 transition-colors">
                                <TableCell className="font-black text-slate-400 pl-8 tracking-tighter italic">{student.admission_number}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-black text-slate-800 text-lg tracking-tighter uppercase">{student.first_name} {student.last_name}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-0.5">Primary Student</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <div className="flex items-center justify-end gap-3">
                                        <Button
                                            variant={attendance[student.id] === "present" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Present")}
                                            className={`h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border-2
                                                ${attendance[student.id] === "present" ? "bg-green-600 border-green-600 shadow-lg shadow-green-100" : "hover:bg-green-50 hover:border-green-100 text-slate-400"}`}
                                        >
                                            <CheckCircle2 className={`mr-2 h-4 w-4 ${attendance[student.id] === "present" ? "animate-pulse" : ""}`} /> Present
                                        </Button>
                                        <Button
                                            variant={attendance[student.id] === "absent" ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Absent")}
                                            className={`h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border-2
                                                ${attendance[student.id] === "absent" ? "bg-red-600 border-red-600 shadow-lg shadow-red-100" : "hover:bg-red-50 hover:border-red-100 text-slate-400"}`}
                                        >
                                            <XCircle className="mr-2 h-4 w-4" /> Absent
                                        </Button>
                                        <Button
                                            variant={attendance[student.id] === "late" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Late")}
                                            className={`h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border-2
                                                ${attendance[student.id] === "late" ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100" : "hover:bg-amber-50 hover:border-amber-100 text-slate-400"}`}
                                        >
                                            <Clock className="mr-2 h-4 w-4" /> Late
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <div className="mt-8 p-6 rounded-[32px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Info className="h-24 w-24" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" /> Security Notification
                    </h3>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest max-w-xl">Every submission is strictly encrypted and locked to your current institutional ID. Cross-school access is logically prevented at the API layer.</p>
                </div>
            </div>
        </div>
    );
}
