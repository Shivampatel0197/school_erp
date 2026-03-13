"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Upload, Plus, FileText, Loader2, Info, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function AssignmentsPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [classes, setClasses] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const fetchData = async () => {
        if (!schoolId) return;
        setLoading(true);
        
        // Fetch classes for dropdown
        const { data: classData } = await supabase
            .from('classes')
            .select('*')
            .eq('school_id', schoolId);
        
        if (classData) setClasses(classData);

        // Fetch existing assignments
        const { data: assignmentData } = await supabase
            .from('assignments')
            .select('*, classes(name, section)')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });
        
        if (assignmentData) setAssignments(assignmentData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [schoolId]);

    const handleCreateAssignment = async () => {
        if (!title || !schoolId || !selectedClass) return;
        setCreating(true);
        
        const { error } = await supabase.from('assignments').insert([
            { 
                title, 
                content: description, 
                due_date: dueDate, 
                class_id: selectedClass, 
                school_id: schoolId 
            }
        ]);

        if (!error) {
            setTitle("");
            setDescription("");
            setDueDate("");
            fetchData();
        }
        setCreating(false);
    };

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">Assignments Central</h2>
                    <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest mt-1 opacity-70 italic">Manage institutional homework and project requirements.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mt-10">
                <Card className="rounded-[40px] border-none shadow-xl bg-white overflow-hidden h-fit">
                    <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-8">
                        <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                            <Plus className="h-6 w-6 text-primary" /> Create Assignment
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold text-slate-400 tracking-widest uppercase italic">Deploy new tasks for your authorized classes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Subject Header</label>
                            <Input 
                                placeholder="E.g., Quantum Mechanics Lab" 
                                className="h-14 rounded-2xl border-2 font-black uppercase tracking-widest placeholder:opacity-30" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Institutional Class</label>
                                <select 
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="flex h-14 w-full rounded-2xl border-2 border-input bg-background px-4 py-2 text-xs font-black uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">Select Target</option>
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} - {c.section}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Final Expiry</label>
                                <Input 
                                    type="date" 
                                    className="h-14 rounded-2xl border-2 font-black uppercase tracking-widest" 
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Technical Instructions</label>
                            <Textarea 
                                placeholder="Mandatory requirements for submission..." 
                                className="min-h-[120px] rounded-3xl border-2 font-black uppercase tracking-widest placeholder:opacity-30" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="pb-8">
                        <Button 
                            className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group"
                            onClick={handleCreateAssignment}
                            disabled={creating}
                        >
                            {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />}
                            Publish Deployment
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 py-8">
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Recent Activities</CardTitle>
                        <CardDescription className="text-[10px] font-bold text-slate-400 tracking-widest uppercase italic">Monitoring status of published tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        {loading ? (
                            <div className="flex h-48 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                        ) : assignments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-100 italic">
                                <BookOpen className="h-12 w-12 text-slate-200 mb-3" />
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No deployments detected</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {assignments.map((assignment, index) => (
                                    <div key={index} className="flex justify-between items-start border-b border-slate-50 pb-6 last:border-0 last:pb-0 group">
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl h-fit border-2 border-blue-100/50">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800 text-lg uppercase tracking-tight italic underline decoration-blue-100 underline-offset-4">{assignment.title}</div>
                                                <div className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest italic group-hover:text-primary transition-colors">Target: {assignment.classes?.name} - {assignment.classes?.section}</div>
                                                <div className="text-[10px] text-red-500 font-black mt-1 flex items-center gap-1 uppercase tracking-widest">
                                                    DUE: {new Date(assignment.due_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="px-4 py-2 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-tighter shadow-xl shadow-slate-200">
                                                Active
                                            </div>
                                            <Button variant="link" size="sm" className="mt-3 h-auto p-0 font-black text-[10px] uppercase tracking-widest text-primary italic">View Reports</Button>
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
