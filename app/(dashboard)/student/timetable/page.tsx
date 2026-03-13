"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function StudentTimetablePage() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const schedule = [
        { time: "09:00 AM", Mon: "Math", Tue: "Physics", Wed: "Math", Thu: "English", Fri: "CS" },
        { time: "10:00 AM", Mon: "Physics", Tue: "Math", Wed: "English", Thu: "CS", Fri: "Math" },
        { time: "11:00 AM", Mon: "Break", Tue: "Break", Wed: "Break", Thu: "Break", Fri: "Break" },
        { time: "11:30 AM", Mon: "English", Tue: "CS", Wed: "Physics", Thu: "Math", Fri: "English" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Weekly Timetable</h2>
                <p className="text-muted-foreground">Class: Grade 10 - A | Academic Year: 2026-27</p>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="bg-slate-900 text-white">
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="w-[120px] font-bold">Time</TableHead>
                                {days.map(day => <TableHead key={day} className="font-bold">{day}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedule.map((slot, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-bold">{slot.time}</TableCell>
                                    <TableCell className={slot.Mon === "Break" ? "text-muted-foreground italic" : "font-medium"}>{slot.Mon}</TableCell>
                                    <TableCell className={slot.Tue === "Break" ? "text-muted-foreground italic" : "font-medium"}>{slot.Tue}</TableCell>
                                    <TableCell className={slot.Wed === "Break" ? "text-muted-foreground italic" : "font-medium"}>{slot.Wed}</TableCell>
                                    <TableCell className={slot.Thu === "Break" ? "text-muted-foreground italic" : "font-medium"}>{slot.Thu}</TableCell>
                                    <TableCell className={slot.Fri === "Break" ? "text-muted-foreground italic" : "font-medium"}>{slot.Fri}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
