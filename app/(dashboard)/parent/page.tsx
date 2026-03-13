"use client";

import { useState } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, ArrowRight, IndianRupee } from "lucide-react";

export default function ParentDashboardPage() {
  const [loading, setLoading] = useState(false);

  const students = [
    { name: "Alice Johnson", class: "Grade 10 - A", attendance: "95%" },
  ];

  const pendingFees = [
    { id: "FEE005", description: "Term 2 Tuition Fee", amount: 15000, due: "Oct 30, 2026" },
    { id: "FEE006", description: "Transport Fee", amount: 2500, due: "Oct 30, 2026" },
  ];

  const paidFees = [
    { id: "FEE001", description: "Term 1 Tuition Fee", amount: 15000, paidOn: "Mar 10, 2026" },
    { id: "FEE002", description: "Admission Fee", amount: 5000, paidOn: "Jan 15, 2026" },
  ];

  const totalDue = pendingFees.reduce((acc, fee) => acc + fee.amount, 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create an order on your backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalDue, description: "School Fees Payment" }),
      });
      const order = await response.json();

      if (order.error) {
        throw new Error(order.error);
      }

      // 2. Setup the Razorpay configuration
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "CampusCore School",
        description: "School Fees Payment",
        order_id: order.id,
        handler: function (response: any) {
          // 3. Handle successful payment
          alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
          // In a real app, you would verify this signature on your backend:
          // response.razorpay_order_id, response.razorpay_signature
        },
        prefill: {
          name: "Parent Name",
          email: "parent@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0f172a", // Tailwind slate-900
        },
      };

      // 4. Open the Razorpay payment modal
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed! Reason: ${response.error.description}`);
      });
      rzp.open();

    } catch (error) {
      console.error("Payment failed", error);
      alert("Failed to initiate payment target.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Parent Portal</h2>
            <p className="text-muted-foreground">Track your children's progress and manage fee payments.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><IndianRupee className="h-5 w-5 text-primary" /> Fees Overview</CardTitle>
              <CardDescription>Outstanding balance for all your dependents.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center text-4xl font-bold tracking-tight text-slate-900">
                    ₹{totalDue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm font-medium text-red-600 mt-2">Due by Oct 30, 2026</div>
                </div>
                <Button onClick={handlePayment} disabled={loading || totalDue === 0} size="lg" className="px-8 shadow-md">
                  {loading ? "Processing..." : "Pay Now"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Children</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {students.map((student) => (
                <div key={student.name} className="flex flex-col border rounded-lg p-4 bg-white shadow-sm">
                  <div className="font-bold text-lg">{student.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">Class: <span className="text-slate-900 font-medium">{student.class}</span></div>
                  <div className="text-sm text-muted-foreground mt-1">Attendance: <span className="text-green-600 font-bold">{student.attendance}</span></div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">View Report Card</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Pending Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingFees.map((fee) => (
                  <div key={fee.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-800">{fee.description}</div>
                      <div className="text-sm text-muted-foreground">Invoice #{fee.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end font-semibold">₹{fee.amount.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-red-500 font-medium">Due {fee.due}</div>
                    </div>
                  </div>
                ))}
                {pendingFees.length === 0 && <div className="text-sm text-muted-foreground text-center py-4">No pending invoices.</div>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5"/> Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paidFees.map((fee) => (
                  <div key={fee.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-800">{fee.description}</div>
                      <div className="text-sm text-muted-foreground">Invoice #{fee.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end font-semibold text-green-600">₹{fee.amount.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-muted-foreground">Paid on {fee.paidOn}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
