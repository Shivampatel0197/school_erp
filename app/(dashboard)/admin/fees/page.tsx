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
import { Plus, Search, DollarSign } from "lucide-react";

const initialFees = [
    { id: "FEE001", student: "Alice Johnson", amount: "$500", status: "Paid", dueDate: "2026-04-01", datePaid: "2026-03-10" },
    { id: "FEE002", student: "Bob Smith", amount: "$500", status: "Unpaid", dueDate: "2026-04-01", datePaid: "-" },
    { id: "FEE003", student: "Charlie Brown", amount: "$450", status: "Overdue", dueDate: "2026-03-01", datePaid: "-" },
];

export default function FeesPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Fees & Payments</h2>
                    <p className="text-muted-foreground">Track student fee payments, invoices, and due amounts.</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" /> Create Invoice</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="border rounded-lg p-4 bg-green-50">
                    <div className="text-sm font-medium text-green-700">Total Collected</div>
                    <div className="text-2xl font-bold text-green-800">$42,500</div>
                </div>
                <div className="border rounded-lg p-4 bg-amber-50">
                    <div className="text-sm font-medium text-amber-700">Total Pending</div>
                    <div className="text-2xl font-bold text-amber-800">$8,000</div>
                </div>
                <div className="border rounded-lg p-4 bg-red-50">
                    <div className="text-sm font-medium text-red-700">Total Overdue</div>
                    <div className="text-2xl font-bold text-red-800">$1,500</div>
                </div>
            </div>

            <div className="flex items-center py-4">
                <div className="relative w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by student name..."
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
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialFees.map((fee) => (
                            <TableRow key={fee.id}>
                                <TableCell className="font-medium">{fee.id}</TableCell>
                                <TableCell>{fee.student}</TableCell>
                                <TableCell>{fee.amount}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${fee.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            fee.status === 'Unpaid' ? 'bg-slate-100 text-slate-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        {fee.status}
                                    </span>
                                </TableCell>
                                <TableCell>{fee.dueDate}</TableCell>
                                <TableCell>
                                    {fee.status !== 'Paid' && (
                                        <Button variant="outline" size="sm" className="h-8">
                                            Mark Paid
                                        </Button>
                                    )}
                                    {fee.status === 'Paid' && (
                                        <span className="text-xs text-muted-foreground">Paid on {fee.datePaid}</span>
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
