import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 hero-gradient">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 tracking-tight">
              EduSaaS
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#features">Features</Link>
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#solutions">Solutions</Link>
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#pricing">Pricing</Link>
            <div className="h-4 w-px bg-border"></div>
            <Link href="/sign-in" className="text-sm font-bold text-primary hover:underline underline-offset-4">Log In</Link>
            <Link href="/sign-up">
              <Button className="rounded-full px-6 shadow-md shadow-primary/20">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                <Zap className="h-3 w-3" /> Now in V1.0 - Next Gen Schooling
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-slate-900">
                The Complete <br />
                <span className="text-primary italic">School Management</span> <br />
                OS for Modernity
              </h1>
              
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Streamline administration, empower teachers, and engage parents with our all-in-one ERP solution. Trusted by 200+ schools worldwide.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/sign-up">
                  <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/30">
                    Deploy to your School <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg bg-white/50">
                  Book a Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 pt-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="text-sm font-bold tracking-widest text-slate-400">TRUSTED BY</div>
                <Globe className="h-8 w-8" />
                <Zap className="h-8 w-8" />
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] -z-10"></div>
        </section>

        {/* Features Section Snippet */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Data Isolation</h3>
                <p className="text-muted-foreground leading-relaxed">Multi-tenant architecture ensuring your school data remains private and secure using Supabase RLS.</p>
              </div>
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Real-time Fees</h3>
                <p className="text-muted-foreground leading-relaxed">Integrated Razorpay payments with instant invoicing and overdue tracking for seamless accounting.</p>
              </div>
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Smart Attendance</h3>
                <p className="text-muted-foreground leading-relaxed">Automated attendance taking for teachers with instant Parent notifications and historical reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-16 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">EduSaaS</span>
            </div>
            
            <div className="flex gap-12 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; 2026 EduSaaS Platform. All rights reserved. Designed for excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
