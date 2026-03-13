"use client";

import { useActionState, useEffect } from "react";
import { registerSchool } from "@/app/actions/school";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, MapPin, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function SetupSchoolForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [state, formAction, isPending] = useActionState(registerSchool, null);

  useEffect(() => {
    async function handleSuccess() {
      if (state?.success && isLoaded && user) {
        // Force Clerk to reload the session metadata
        await user.reload();
        router.push("/admin");
        router.refresh();
      }
    }
    if (state?.success) {
      handleSuccess();
    }
  }, [state, router, user, isLoaded]);

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
          <GraduationCap className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Register Your School</h1>
        <p className="text-slate-500 font-medium">
          Let&apos;s get your institution set up on Campusore.
        </p>
      </div>

      <form action={formAction} className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
        {state?.error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{state.error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">School Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                required
                name="schoolName"
                placeholder="e.g. St. Xavier's International"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Official Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <textarea
                required
                name="address"
                placeholder="Street, City, State, Zip Code"
                rows={3}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Contact Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                required
                type="email"
                name="contactEmail"
                placeholder="admin@school.com"
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 group relative overflow-hidden"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Create Institution <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
        
        <p className="text-center text-xs text-slate-400 font-medium">
          By clicking create, you agree to our Terms of Service.
        </p>
      </form>
    </div>
  );
}
