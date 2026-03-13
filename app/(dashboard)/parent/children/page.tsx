"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, GraduationCap, Calendar, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyChildrenPage() {
    const children = [
        { 
            name: "Alice Johnson", 
            class: "Grade 10 - A", 
            roll: "1", 
            attendance: "95%",
            teacher: "Mr. Doe",
            admissionDate: "Apr 2024"
        },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Children</h2>
                <p className="text-muted-foreground">Manage and track your dependents registered in the school.</p>
            </div>

            <div className="grid gap-6">
                {children.map((child) => (
                    <Card key={child.name} className="overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b border-primary/10">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-black text-slate-900">{child.name}</CardTitle>
                                    <p className="text-primary font-bold">{child.class}</p>
                                </div>
                                <div className="p-3 bg-white rounded-2xl shadow-sm">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <GraduationCap className="h-3 w-3" /> Roll Number
                                    </div>
                                    <div className="font-bold text-slate-800">{child.roll}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <ClipboardCheck className="h-3 w-3" /> Attendance
                                    </div>
                                    <div className="font-black text-green-600">{child.attendance}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Users className="h-3 w-3" /> Class Teacher
                                    </div>
                                    <div className="font-bold text-slate-800">{child.teacher}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="h-3 w-3" /> Admission Date
                                    </div>
                                    <div className="font-bold text-slate-800">{child.admissionDate}</div>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-4">
                                <Button className="rounded-xl px-6">View Academic Profile</Button>
                                <Button variant="outline" className="rounded-xl px-6">Contact Teacher</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
