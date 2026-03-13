"use client";

import { useState, useEffect } from "react";
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
import { Plus, Search, DollarSign, Loader2, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function FeesPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [fees, setFees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ collected: 0, pending: 0, overdue: 0 });

    const fetchFees = async () => {
        if (!schoolId) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('fees')
            .select('*, students(first_name, last_name)')
            .eq('school_id', schoolId)
            .order('due_date', { ascending: false });
        
        if (data) {
            setFees(data);
            const collected = data.filter(f => f.status === 'paid').reduce((acc, curr) => acc + Number(curr.amount), 0);
            const pending = data.filter(f => f.status === 'unpaid').reduce((acc, curr) => acc + Number(curr.amount), 0);
            const overdue = data.filter(f => f.status === 'overdue').reduce((acc, curr) => acc + Number(curr.amount), 0);
            setStats({ collected, pending, overdue });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFees();
    }, [schoolId]);

    const filteredFees = fees.filter(f => 
        `${f.students?.first_name} ${f.students?.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Fees & Payments</h2>
                    <p className="text-muted-foreground">Track student fee payments, invoices, and due amounts.</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Create Invoice</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Generate New Invoice</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input placeholder="Student Admission Number" />
                            <Input placeholder="Amount (e.g. 5000)" type="number" />
                            <Input type="date" placeholder="Due Date" />
                            <Button className="w-full" onClick={() => setIsOpen(false)}>Create Invoice</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="border border-green-200 rounded-3xl p-6 bg-green-50/50 shadow-sm relative overflow-hidden group">
                    <DollarSign className="absolute -right-2 -bottom-2 h-24 w-24 text-green-100 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-bold text-green-700 uppercase tracking-widest">Total Collected</div>
                    <div className="text-3xl font-black text-green-900 mt-2">₹{stats.collected.toLocaleString()}</div>
                    <div className="text-xs text-green-600 mt-1 font-medium">Synced with database</div>
                </div>
                <div className="border border-amber-200 rounded-3xl p-6 bg-amber-50/50 shadow-sm relative overflow-hidden group">
                    <Loader2 className="absolute -right-2 -bottom-2 h-24 w-24 text-amber-100 group-hover:rotate-45 transition-transform" />
                    <div className="text-sm font-bold text-amber-700 uppercase tracking-widest">Total Pending</div>
                    <div className="text-3xl font-black text-amber-900 mt-2">₹{stats.pending.toLocaleString()}</div>
                    <div className="text-xs text-amber-600 mt-1 font-medium italic">Require followup</div>
                </div>
                <div className="border border-red-200 rounded-3xl p-6 bg-red-50/50 shadow-sm relative overflow-hidden group">
                    <CreditCard className="absolute -right-2 -bottom-2 h-24 w-24 text-red-100 group-hover:-translate-y-2 transition-transform" />
                    <div className="text-sm font-bold text-red-700 uppercase tracking-widest">Total Overdue</div>
                    <div className="text-3xl font-black text-red-900 mt-2">₹{stats.overdue.toLocaleString()}</div>
                    <div className="text-xs text-red-600 mt-1 font-medium uppercase font-black">Immediate action</div>
                </div>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by student name..."
                        className="pl-11 h-12 rounded-2xl border-slate-200 focus:ring-primary/10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-[32px] border bg-white overflow-hidden shadow-xl shadow-slate-100/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow>
                            <TableHead className="font-bold">Student Name</TableHead>
                            <TableHead className="font-bold">Amount</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="font-bold">Due Date</TableHead>
                            <TableHead className="font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></TableCell>
                            </TableRow>
                        ) : filteredFees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center text-slate-400 font-medium italic">No fee records found for this school.</TableCell>
                            </TableRow>
                        ) : filteredFees.map((fee) => (
                            <TableRow key={fee.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell className="font-bold text-slate-800">{fee.students?.first_name} {fee.students?.last_name}</TableCell>
                                <TableCell className="font-black text-slate-900">₹{Number(fee.amount).toLocaleString()}</TableCell>
                                <TableCell>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                                        ${fee.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        fee.status === 'unpaid' ? 'bg-slate-100 text-slate-700' :
                                        'bg-red-100 text-red-700'}`}>
                                        {fee.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-slate-600 font-medium">{new Date(fee.due_date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {fee.status !== 'paid' && (
                                        <Button variant="outline" size="sm" className="h-9 rounded-xl font-bold border-2 hover:bg-slate-50">
                                            Mark Paid
                                        </Button>
                                    )}
                                    {fee.status === 'paid' && (
                                        <span className="text-xs text-green-600 font-black italic">COMPLETED</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
