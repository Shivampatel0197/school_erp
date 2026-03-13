"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, Calendar } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function StudentExamsPage() {
    const upcomingExams = [
        { id: 1, subject: "Mathematics", date: "Oct 25, 2026", time: "09:00 AM", room: "Hall A" },
        { id: 2, subject: "Physics", date: "Oct 27, 2026", time: "10:30 AM", room: "Hall B" },
    ];

    const results = [
        { id: 1, subject: "Mathematics (Monthly Test)", marks: "45/50", grade: "A+" },
        { id: 2, subject: "Chemistry (Unit Test)", marks: "38/50", grade: "B+" },
    ];

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Exams & Results</h2>
                <p className="text-muted-foreground">View your upcoming exam schedule and performance reports.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Upcoming Exams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingExams.map((exam) => (
                                <div key={exam.id} className="p-4 border rounded-xl bg-slate-50 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-900">{exam.subject}</div>
                                        <div className="text-sm text-muted-foreground">{exam.date} at {exam.time}</div>
                                    </div>
                                    <div className="text-xs font-black px-2 py-1 rounded-md bg-white border">{exam.room}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Past Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Marks</TableHead>
                                    <TableHead className="text-right">Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {results.map((result) => (
                                    <TableRow key={result.id}>
                                        <TableCell className="font-medium">{result.subject}</TableCell>
                                        <TableCell>{result.marks}</TableCell>
                                        <TableCell className="text-right font-black text-primary">{result.grade}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
