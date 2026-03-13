"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentAssignmentsPage() {
    const assignments = [
        { id: 1, title: "Algebra Chapter 5 Practice", subject: "Mathematics", due: "Oct 16, 2026", status: "Pending" },
        { id: 2, title: "Newton's Laws Essay", subject: "Physics", due: "Oct 18, 2026", status: "Pending" },
        { id: 3, title: "English Poetry Analysis", subject: "English Lit", due: "Oct 12, 2026", status: "Submitted" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
                <p className="text-muted-foreground">Keep track of your coursework and deadlines.</p>
            </div>

            <div className="grid gap-6">
                {assignments.map((assignment) => (
                    <Card key={assignment.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" /> {assignment.title}
                            </CardTitle>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                assignment.status === "Submitted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                                {assignment.status}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{assignment.subject}</div>
                                    <div className="flex items-center text-sm font-medium text-red-500">
                                        <Clock className="mr-1 h-4 w-4" /> Due by {assignment.due}
                                    </div>
                                </div>
                                <Button variant={assignment.status === "Submitted" ? "outline" : "default"}>
                                    {assignment.status === "Submitted" ? "View Submission" : "Submit Now"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
