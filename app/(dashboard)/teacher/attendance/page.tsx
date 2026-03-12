"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Save } from "lucide-react";

export default function TeacherAttendancePage() {
    const [attendance, setAttendance] = useState<Record<string, string>>({
        STU001: "Present",
        STU002: "Absent",
        STU003: "Late",
    });

    const students = [
        { id: "STU001", name: "Alice Johnson", roll: "1" },
        { id: "STU002", name: "Bob Smith", roll: "2" },
        { id: "STU003", name: "Charlie Brown", roll: "3" },
        { id: "STU004", name: "David Williams", roll: "4" },
        { id: "STU005", name: "Emma Davis", roll: "5" },
    ];

    const handleMark = (id: string, status: string) => {
        setAttendance((prev) => ({ ...prev, [id]: status }));
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Mark Attendance</h2>
                    <p className="text-muted-foreground">Class: Grade 10 - A | Subject: Mathematics | Date: Oct 15, 2026</p>
                </div>
                <Button><Save className="mr-2 h-4 w-4" /> Submit Attendance</Button>
            </div>

            <div className="rounded-md border bg-white mt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Roll No</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Student ID</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.roll}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell className="text-muted-foreground">{student.id}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant={attendance[student.id] === "Present" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Present")}
                                            className={attendance[student.id] === "Present" ? "bg-green-600 hover:bg-green-700" : ""}
                                        >
                                            <CheckCircle2 className="mr-1 h-4 w-4" /> Present
                                        </Button>
                                        <Button
                                            variant={attendance[student.id] === "Absent" ? "destructive" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Absent")}
                                        >
                                            <XCircle className="mr-1 h-4 w-4" /> Absent
                                        </Button>
                                        <Button
                                            variant={attendance[student.id] === "Late" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleMark(student.id, "Late")}
                                            className={attendance[student.id] === "Late" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                                        >
                                            <Clock className="mr-1 h-4 w-4" /> Late
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
