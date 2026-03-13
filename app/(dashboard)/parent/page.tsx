"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, ArrowRight, IndianRupee, Loader2, Info, Users, GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function ParentDashboardPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [students, setStudents] = useState<any[]>([]);
    const [pendingFees, setPendingFees] = useState<any[]>([]);
    const [paidFees, setPaidFees] = useState<any[]>([]);

    useEffect(() => {
        async function fetchParentData() {
            if (!schoolId) return;
            setLoading(true);
            
            try {
                // 1. Fetch children for this school
                const { data: studentData } = await supabase
                    .from('students')
                    .select('*, classes(name, section), attendance(status)')
                    .eq('school_id', schoolId);
                
                if (studentData) {
                    const formattedStudents = studentData.map(s => {
                        const attendance = s.attendance || [];
                        const rate = attendance.length > 0 
                            ? (attendance.filter((a: any) => a.status === 'present').length / attendance.length) * 100 
                            : 0;
                        return {
                            name: `${s.first_name} ${s.last_name}`,
                            class: `${s.classes?.name || 'TBA'} - ${s.classes?.section || 'TBA'}`,
                            attendance: `${rate.toFixed(1)}%`
                        };
                    });
                    setStudents(formattedStudents);
                }

                // 2. Fetch fees for this school
                const { data: feeData } = await supabase
                    .from('fees')
                    .select('*')
                    .eq('school_id', schoolId);

                if (feeData) {
                    setPendingFees(feeData.filter(f => f.status === 'unpaid' || f.status === 'overdue'));
                    setPaidFees(feeData.filter(f => f.status === 'paid'));
                }

            } catch (error) {
                console.error("Error fetching parent data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchParentData();
    }, [schoolId]);

    const totalDue = pendingFees.reduce((acc, fee) => acc + Number(fee.amount), 0);

    const handlePayment = async () => {
        setPaymentLoading(true);
        // Razorpay logic here (same as before but dynamic for totalDue)
        setPaymentLoading(false);
    };

    return (
        <>
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
            
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">PARENT PORTAL</h2>
                        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest mt-1 italic">Managing institutional progress for your children.</p>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-1 lg:col-span-2 border-none bg-primary shadow-2xl shadow-primary/20 rounded-[40px] overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <IndianRupee className="h-40 w-40 text-white" />
                        </div>
                        <CardHeader className="relative z-10 pt-8 px-8">
                            <CardTitle className="flex items-center gap-2 text-white/80 uppercase text-xs font-black tracking-widest italic">
                                <CreditCard className="h-4 w-4" /> Fees Overview
                            </CardTitle>
                            <CardDescription className="text-white/60 font-bold text-[10px] uppercase tracking-tighter">Your outstanding balance for this school session.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 p-8 pt-0">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <div className="text-5xl font-black tracking-tighter text-white">
                                        {loading ? <Loader2 className="h-10 w-10 animate-spin" /> : `₹${totalDue.toLocaleString('en-IN')}`}
                                    </div>
                                    <div className="text-[10px] font-black text-white/70 mt-3 uppercase tracking-widest italic flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" /> Status: {totalDue > 0 ? "PAYMENT REQUIRED" : "ALL CLEAR"}
                                    </div>
                                </div>
                                <Button 
                                    onClick={handlePayment} 
                                    disabled={paymentLoading || totalDue === 0} 
                                    size="lg" 
                                    className="px-10 h-16 rounded-2xl bg-white text-primary hover:bg-slate-100 font-black uppercase tracking-widest shadow-xl group"
                                >
                                    {paymentLoading ? "Processing..." : "Secure Payment"} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 py-6">
                            <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" /> My Children
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            {loading ? (
                                <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                            ) : students.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100 italic">
                                    <GraduationCap className="h-10 w-10 text-slate-200 mb-2" />
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No students linked found labels.</p>
                                </div>
                            ) : students.map((student) => (
                                <div key={student.name} className="flex flex-col border-2 border-slate-100 rounded-3xl p-6 bg-white hover:border-primary/20 transition-all group">
                                    <div className="font-black text-xl text-slate-900 tracking-tighter uppercase">{student.name}</div>
                                    <div className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">Class: <span className="text-slate-900">{student.class}</span></div>
                                    <div className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Attendance: <span className="text-green-600 italic">{student.attendance}</span></div>
                                    <Button variant="outline" size="sm" className="mt-6 w-full h-11 rounded-xl border-2 font-black uppercase tracking-widest text-[10px] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">Full Report</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 md:grid-cols-2 mt-8">
                    <Card className="rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
                            <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                                <CreditCard className="h-5 w-5 text-primary"/> Pending Invoices
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {loading ? (
                                <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                            ) : pendingFees.length === 0 ? (
                                <div className="text-xs font-black text-slate-400 text-center py-10 italic uppercase tracking-widest flex flex-col items-center gap-2">
                                    <Info className="h-8 w-8 text-slate-100" />
                                    No pending records found labels.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendingFees.map((fee) => (
                                        <div key={fee.id} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-black text-slate-800 uppercase tracking-tighter">{fee.description}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase italic">Invoice #{fee.id.slice(0, 8)}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-slate-900 tracking-tighter italic">₹{Number(fee.amount).toLocaleString('en-IN')}</div>
                                                <div className="text-[10px] text-red-500 font-black uppercase tracking-widest">Due {new Date(fee.due_date).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[40px] border-none shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
                            <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter text-slate-700">
                                <Receipt className="h-5 w-5 text-slate-400"/> Payment History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {loading ? (
                                <div className="flex h-32 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                            ) : paidFees.length === 0 ? (
                                <div className="text-xs font-black text-slate-400 text-center py-10 italic uppercase tracking-widest flex flex-col items-center gap-2">
                                    <Info className="h-8 w-8 text-slate-100" />
                                    No transaction logs available.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {paidFees.map((fee) => (
                                        <div key={fee.id} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-black text-slate-800 uppercase tracking-tighter">{fee.description}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase italic">Invoice #{fee.id.slice(0, 8)}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-green-600 tracking-tighter italic">₹{Number(fee.amount).toLocaleString('en-IN')}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Success</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
