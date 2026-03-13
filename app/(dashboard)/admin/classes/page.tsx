"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, BookOpen, Users, Settings, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function ClassesPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [className, setClassName] = useState("");
    const [section, setSection] = useState("");

    const fetchClasses = async () => {
        if (!schoolId) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('classes')
            .select('*, students(count)')
            .eq('school_id', schoolId);
        
        if (data) setClasses(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchClasses();
    }, [schoolId]);

    const handleCreateClass = async () => {
        if (!className || !schoolId) return;
        
        const { error } = await supabase.from('classes').insert([
            { name: className, section, school_id: schoolId }
        ]);

        if (!error) {
            setIsOpen(false);
            setClassName("");
            setSection("");
            fetchClasses();
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Classes & Subjects</h2>
                    <p className="text-muted-foreground">Manage school classes, sections, and assigned subjects.</p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button><Plus className="mr-2 h-4 w-4" /> Add Class</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Class</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Input 
                                    placeholder="Class Name (e.g. Grade 11)" 
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                />
                                <Input 
                                    placeholder="Section (e.g. A)" 
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <Button className="w-full" onClick={handleCreateClass}>Save Class</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : classes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-3xl bg-slate-50/50">
                    <div className="p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <BookOpen className="h-10 w-10" />
                    </div>
                    <p className="text-slate-500 font-medium">No classes found labels for your school.</p>
                    <p className="text-slate-400 text-sm">Create your first class to get started.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {classes.map((cls) => (
                        <Card key={cls.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-bold">{cls.name} - {cls.section}</CardTitle>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 mt-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" /> {cls.student_count || 0} Students
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">Section:</span> {cls.section}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
