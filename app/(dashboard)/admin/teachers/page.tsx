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

export default function TeachersPage() {
    const [search, setSearch] = useState("");
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [subjects, setSubjects] = useState("");
    const [classesAssigned, setClassesAssigned] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [joinedDate, setJoinedDate] = useState("");

    const fetchTeachers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('teachers').select('*').order('created_at', { ascending: false });
        if (data) {
            setTeachers(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleSaveTeacher = async () => {
        if (!name) return alert("Name is required");

        // We need a school_id. In a real app, this comes from the logged-in admin's metadata.
        // For now, we will fetch the first school_id available.
        const { data: schools } = await supabase.from('schools').select('id').limit(1);
        if (!schools || schools.length === 0) return alert("No schools found in DB to link teacher to.");
        
        const school_id = schools[0].id;

        const { error } = await supabase.from('teachers').insert([
            {
                school_id: school_id,
                name: name,
                subjects: subjects,
                classes: classesAssigned,
                contact_details: contactDetails,
                joined_date: joinedDate || null,
            }
        ]);

        if (error) {
            alert(`Error adding teacher: ${error.message}`);
        } else {
            alert("Teacher added successfully!");
            setIsOpen(false);
            // reset form
            setName("");
            setSubjects("");
            setClassesAssigned("");
            setContactDetails("");
            setJoinedDate("");
            fetchTeachers();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this teacher?")) return;
        const { error } = await supabase.from('teachers').delete().eq('id', id);
        if (error) {
            alert("Failed to delete teacher");
        } else {
            fetchTeachers();
        }
    };

    const filtered = teachers.filter(t => 
        (t.name || "").toLowerCase().includes(search.toLowerCase()) || 
        (t.subjects || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
                    <p className="text-muted-foreground">Manage teaching staff, assignments, and subjects.</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Teacher</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Teacher</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subjects</label>
                                    <Input value={subjects} onChange={e => setSubjects(e.target.value)} placeholder="Ex: Math, Physics" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Assigned Classes</label>
                                    <Input value={classesAssigned} onChange={e => setClassesAssigned(e.target.value)} placeholder="Ex: Grade 10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Details</label>
                                <Input value={contactDetails} onChange={e => setContactDetails(e.target.value)} placeholder="Email or Phone" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Joined Date</label>
                                <Input type="date" value={joinedDate} onChange={e => setJoinedDate(e.target.value)} />
                            </div>
                            <Button className="w-full mt-2" onClick={handleSaveTeacher}>Save Teacher</Button>
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
                            <TableHead>Name</TableHead>
                            <TableHead>Subjects</TableHead>
                            <TableHead>Classes</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading teachers...</TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No teachers found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="font-medium">{teacher.name}</TableCell>
                                    <TableCell>{teacher.subjects}</TableCell>
                                    <TableCell>{teacher.classes}</TableCell>
                                    <TableCell>{teacher.contact_details}</TableCell>
                                    <TableCell>{teacher.joined_date}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(teacher.id)}>
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
