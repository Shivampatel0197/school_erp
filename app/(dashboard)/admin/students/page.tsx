"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    // Form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [admissionNumber, setAdmissionNumber] = useState("");
    const [className, setClassName] = useState("");
    const [dob, setDob] = useState("");
    const [parentName, setParentName] = useState("");

    const fetchStudents = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
        if (data) {
            setStudents(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSaveStudent = async () => {
        if (!firstName || !lastName || !admissionNumber) {
            return alert("First Name, Last Name, and Admission Number are required!");
        }

        const { data: schools } = await supabase.from('schools').select('id').limit(1);
        if (!schools || schools.length === 0) return alert("No schools found in DB to link student to.");
        
        const school_id = schools[0].id;

        const { error } = await supabase.from('students').insert([
            {
                school_id: school_id,
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`,
                admission_number: admissionNumber,
                class_name: className,
                date_of_birth: dob || null,
                parent_name: parentName,
            }
        ]);

        if (error) {
            alert(`Error adding student: ${error.message}`);
        } else {
            alert("Student added successfully!");
            setIsOpen(false);
            // Reset fields
            setFirstName("");
            setLastName("");
            setAdmissionNumber("");
            setClassName("");
            setDob("");
            setParentName("");
            fetchStudents();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this student?")) return;
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (error) {
            alert("Failed to delete student");
        } else {
            fetchStudents();
        }
    };

    const filtered = students.filter(s => 
        (s.full_name || `${s.first_name} ${s.last_name}`).toLowerCase().includes(search.toLowerCase()) || 
        (s.admission_number || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                    <p className="text-muted-foreground">Manage school students, view profiles, and update details.</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger render={<Button />}>
                        <Plus className="mr-2 h-4 w-4" /> Add Student
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Student</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Admission Number</label>
                                <Input value={admissionNumber} onChange={e => setAdmissionNumber(e.target.value)} placeholder="Ex: STU004" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Class</label>
                                    <Input value={className} onChange={e => setClassName(e.target.value)} placeholder="Ex: Grade 10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date of Birth</label>
                                    <Input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Parent Name</label>
                                <Input value={parentName} onChange={e => setParentName(e.target.value)} placeholder="Ex: John Doe Sr." />
                            </div>
                            <Button className="w-full mt-2" onClick={handleSaveStudent}>Save Student</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search students or IDs..."
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
                            <TableHead>Admission No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Parent Name</TableHead>
                            <TableHead>Date of Birth</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading students...</TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No students found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.admission_number}</TableCell>
                                    <TableCell>{student.full_name || `${student.first_name} ${student.last_name}`}</TableCell>
                                    <TableCell>{student.class_name}</TableCell>
                                    <TableCell>{student.parent_name}</TableCell>
                                    <TableCell>{student.date_of_birth}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(student.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
