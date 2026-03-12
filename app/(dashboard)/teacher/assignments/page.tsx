"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Upload, Plus, FileText } from "lucide-react";

export default function AssignmentsPage() {
    const previousAssignments = [
        { title: "Algebra Chapter 5 Practice", class: "Grade 10 - A", dueDate: "Oct 20, 2026", submissions: "24/32" },
        { title: "Trigonometry Basics", class: "Grade 10 - B", dueDate: "Oct 18, 2026", submissions: "28/28" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
                    <p className="text-muted-foreground">Create assignments, attach files, and standard track submissions.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Create New Assignment</CardTitle>
                        <CardDescription>Post homework or project requirements for your classes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assignment Title</label>
                            <Input placeholder="E.g., Physics Lab Report" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Target Class</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                    <option>Grade 10 - A</option>
                                    <option>Grade 10 - B</option>
                                    <option>Grade 9 - A</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Due Date</label>
                                <Input type="date" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea placeholder="Instructions for the students..." className="min-h-[100px]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Attach File (Optional)</label>
                            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-slate-50 transition-colors cursor-pointer">
                                <Upload className="h-8 w-8 mb-2 text-slate-400" />
                                <span className="text-sm">Click to upload or drag and drop</span>
                                <span className="text-xs mt-1">PDF, DOCX, ZIP up to 10MB</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Create Assignment</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Assignments</CardTitle>
                        <CardDescription>View status and grade submissions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {previousAssignments.map((assignment, index) => (
                                <div key={index} className="flex justify-between items-start border-b last:border-0 pb-4 last:pb-0">
                                    <div className="flex gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{assignment.title}</div>
                                            <div className="text-sm text-muted-foreground mt-1">Class: {assignment.class}</div>
                                            <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                                Due: {assignment.dueDate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold bg-slate-100 px-3 py-1 rounded-md">{assignment.submissions}</div>
                                        <div className="text-xs text-muted-foreground mt-1 text-center font-medium">Submitted</div>
                                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">View All</Button>
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
