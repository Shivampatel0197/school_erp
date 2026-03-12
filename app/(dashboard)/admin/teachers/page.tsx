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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Plus, Search, Pencil, Trash2 } from "lucide-react";

const initialTeachers = [
    { id: "TCH001", name: "Mr. John Doe", subjects: "Mathematics", classes: "Grade 10, Grade 9", joined: "2020-04-12" },
    { id: "TCH002", name: "Ms. Jane Smith", subjects: "English Literature", classes: "Grade 10, Grade 8", joined: "2019-08-20" },
    { id: "TCH003", name: "Dr. Alan Turing", subjects: "Computer Science", classes: "Grade 11, Grade 12", joined: "2021-01-15" },
];

export default function TeachersPage() {
    const [search, setSearch] = useState("");
    const [teachers, setTeachers] = useState(initialTeachers);

    const filtered = teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.subjects.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
                    <p className="text-muted-foreground">Manage teaching staff, assignments, and subjects.</p>
                </div>

                <Dialog>
                    <DialogTrigger>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Teacher</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Teacher</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input placeholder="Enter full name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subjects</label>
                                    <Input placeholder="Ex: Math, Physics" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Assigned Classes</label>
                                    <Input placeholder="Ex: Grade 10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Details</label>
                                <Input placeholder="Email or Phone" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Joined Date</label>
                                <Input type="date" />
                            </div>
                            <Button className="w-full mt-2">Save Teacher</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search teachers or subjects..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Subjects</TableHead>
                            <TableHead>Classes</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell className="font-medium">{teacher.id}</TableCell>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>{teacher.subjects}</TableCell>
                                <TableCell>{teacher.classes}</TableCell>
                                <TableCell>{teacher.joined}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No teachers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
