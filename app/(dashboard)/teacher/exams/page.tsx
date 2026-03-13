"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Save } from "lucide-react";

const initialStudents = [
    { id: "STU001", name: "Alice Johnson", marks: "85" },
    { id: "STU002", name: "Bob Smith", marks: "92" },
    { id: "STU003", name: "Charlie Brown", marks: "" },
];

export default function ExamsGradingPage() {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState(initialStudents);

    const handleMarksChange = (id: string, value: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, marks: value } : s));
    };

    const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Exams & Grading</h2>
                    <p className="text-muted-foreground">Manage exam results and enter marks for students.</p>
                </div>

                <Dialog>
                    <DialogTrigger render={<Button />}>
                        <Plus className="mr-2 h-4 w-4" /> Create Exam
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Exam</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Exam Name</label>
                                <Input placeholder="E.g., Midterm Exam" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Class</label>
                                    <Input placeholder="E.g., Grade 10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subject</label>
                                    <Input placeholder="E.g., Science" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Total Marks</label>
                                    <Input placeholder="100" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date</label>
                                    <Input type="date" />
                                </div>
                            </div>
                            <Button className="w-full mt-2">Save Exam</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-6 border rounded-lg p-6 bg-slate-50">
                <h3 className="text-lg font-semibold mb-2">Current Active Exam: Midterm Examination</h3>
                <p className="text-sm text-muted-foreground">Class: Grade 10 - A | Subject: Science | Total Marks: 100</p>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className="relative w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search students..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="bg-white"><Save className="mr-2 h-4 w-4" /> Save All Marks</Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[150px]">Marks Obtained</TableHead>
                            <TableHead className="w-[120px]">Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((student) => {
                            const numMarks = parseInt(student.marks);
                            let grade = "-";
                            if (student.marks) {
                                if (numMarks >= 90) grade = "A+";
                                else if (numMarks >= 80) grade = "A";
                                else if (numMarks >= 70) grade = "B";
                                else if (numMarks >= 60) grade = "C";
                                else grade = "F";
                            }

                            return (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium text-muted-foreground">{student.id}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            max="100"
                                            min="0"
                                            className="h-8 max-w-[100px]"
                                            value={student.marks}
                                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${grade === 'A+' || grade === 'A' ? 'bg-green-100 text-green-700' :
                                            grade === 'B' || grade === 'C' ? 'bg-blue-100 text-blue-700' :
                                                grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-slate-100'
                                            }`}>
                                            {grade}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
