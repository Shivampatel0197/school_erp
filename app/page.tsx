import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, CheckCircle2, ShieldCheck, Zap, Globe, Users, Menu } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
            <Button render={<Link href="/sign-up" />} className="rounded-full px-6 shadow-md shadow-primary/20">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-6 w-6" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-xs h-full flex flex-col justify-start p-8">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-2xl font-black text-primary">EduSaaS</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6">
                  <Link href="#features" className="text-lg font-bold">Features</Link>
                  <Link href="#solutions" className="text-lg font-bold">Solutions</Link>
                  <Link href="#pricing" className="text-lg font-bold">Pricing</Link>
                  <div className="h-px bg-border my-2"></div>
                  <Button render={<Link href="/sign-in" />} variant="outline" className="w-full h-12 rounded-xl">Log In</Button>
                  <Button render={<Link href="/sign-up" />} className="w-full h-12 rounded-xl">Get Started</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
                <Button render={<Link href="/sign-up" />} size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/30 w-full sm:w-auto">
                  Deploy to your School <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="#pricing">
                  <Button variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg bg-white/50 w-full sm:w-auto">
                    Book a Demo
                  </Button>
                </Link>
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

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Schools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to manage your institution efficiently in one unified platform.</p>
          </div>
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
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Teacher Portals</h3>
                <p className="text-muted-foreground leading-relaxed">Dedicated dashboards for faculty to manage assignments, exams, and student performance metrics.</p>
              </div>
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Parent Mobile Apps</h3>
                <p className="text-muted-foreground leading-relaxed">Instant updates for parents on their child's progress, attendance, and school announcements.</p>
              </div>
              <div className="space-y-4 p-8 rounded-3xl border hover:shadow-2xl hover:border-primary/20 transition-all bg-slate-50/50 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Exam Management</h3>
                <p className="text-muted-foreground leading-relaxed">Create exams, generate marksheet, and track results across different grades automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Tailored Solutions for <span className="text-primary italic">Every Role</span></h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 text-left">For Administrators</h4>
                      <p className="text-muted-foreground text-left">Manage the entire school from a high-level cockpit with financial and academic insights.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 text-left">For Teachers</h4>
                      <p className="text-muted-foreground text-left">Focus on teaching, not paperwork. Simple tools for attendance, grades, and communication.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 text-left">For Parents & Students</h4>
                      <p className="text-muted-foreground text-left">Stay connected and updated with real-time academic progress and fee reminders.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-primary/5 rounded-[40px] p-8 border border-primary/10 relative">
                <div className="aspect-square bg-white rounded-3xl shadow-2xl flex items-center justify-center p-12 animate-float">
                  <div className="text-center space-y-4">
                    <div className="text-primary font-black text-6xl italic">98%</div>
                    <div className="font-bold text-xl uppercase tracking-widest text-slate-400">School Efficiency Increase</div>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-purple-500 rounded-3xl -z-10 blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Transparent Pricing for Schools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Scale your institution with a subscription plan that fits your size.</p>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="border p-8 rounded-3xl bg-white hover:border-primary transition-all shadow-sm">
                <h3 className="text-xl font-bold mb-2">Small School</h3>
                <div className="text-4xl font-black mb-6">₹4,999<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Up to 200 Students</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Basic Attendance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Admin Dashboard</li>
                </ul>
                <Button variant="outline" className="w-full rounded-full">Coming Soon</Button>
              </div>
              
              {/* Pro Plan */}
              <div className="border-2 border-primary p-8 rounded-3xl bg-slate-900 text-white relative shadow-xl scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold font-sans uppercase">Most Popular</div>
                <h3 className="text-xl font-bold mb-2">Standard Institution</h3>
                <div className="text-4xl font-black mb-6 text-primary">₹12,499<span className="text-sm font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Up to 1000 Students</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Full Fee Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Teacher & Parent Apps</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Exams & Result Entry</li>
                </ul>
                <Button render={<Link href="/sign-up" />} className="w-full rounded-full bg-primary hover:bg-primary/90">Get Started Now</Button>
              </div>

              {/* Enterprise Plan */}
              <div className="border p-8 rounded-3xl bg-white hover:border-primary transition-all shadow-sm">
                <h3 className="text-xl font-bold mb-2">Multi-School Chain</h3>
                <div className="text-4xl font-black mb-6">Custom</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Unlimited Students</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Dedicated Account Manager</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Custom Domain & Branding</li>
                </ul>
                <Button variant="outline" className="w-full rounded-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription CTA for Schools */}
        <section id="subscribe" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[50px] p-8 md:p-16 text-white text-center space-y-8 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to digitize your classroom?</h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg italic">Join over 200 institutions currently scaling with EduSaaS. One-click setup for any school.</p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button render={<Link href="/sign-up" />} size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg font-bold w-full sm:w-auto">
                    Subscribe Your School <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg border-white/20 hover:bg-white/10 w-full sm:w-auto">
                    Request Pricing PDF
                  </Button>
                </div>
              </div>
              
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[100px] -z-0"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px] -z-0"></div>
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
