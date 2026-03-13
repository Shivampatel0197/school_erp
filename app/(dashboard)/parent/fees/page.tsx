"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, FileText, Download, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ParentFeesPage() {
    const feeHistory = [
        { id: "INV-001", amount: 15000, date: "Apr 05, 2026", status: "Paid", description: "Term 1 Tuition" },
        { id: "INV-002", amount: 2500, date: "Apr 10, 2026", status: "Paid", description: "Transport Fee (Q1)" },
        { id: "INV-003", amount: 12000, date: "Oct 25, 2026", status: "Pending", description: "Term 2 Tuition" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
                    <p className="text-muted-foreground">View invoices, payment history, and download receipts.</p>
                </div>
                <Button className="rounded-xl shadow-lg shadow-primary/20">
                    <IndianRupee className="mr-2 h-4 w-4" /> Pay Balance
                </Button>
            </div>

            <Card className="rounded-[32px] overflow-hidden shadow-xl shadow-slate-100 border-none">
                <CardHeader className="bg-slate-900 text-white p-8">
                    <CardTitle className="text-xl font-black text-white flex items-center gap-2">
                        <FileText className="h-5 w-5" /> Transaction History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="font-bold">Invoice ID</TableHead>
                                <TableHead className="font-bold">Description</TableHead>
                                <TableHead className="font-bold">Amount</TableHead>
                                <TableHead className="font-bold">Date</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="text-right font-bold w-[120px]">Receipt</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feeHistory.map((fee) => (
                                <TableRow key={fee.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-mono text-xs font-bold">{fee.id}</TableCell>
                                    <TableCell className="font-medium text-slate-700">{fee.description}</TableCell>
                                    <TableCell className="font-black text-slate-900">₹{fee.amount.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-slate-500 font-medium">{fee.date}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                                            fee.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                            {fee.status === "Paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {fee.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" disabled={fee.status !== "Paid"} className="hover:bg-primary/5 hover:text-primary rounded-lg">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
