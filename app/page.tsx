import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, CheckCircle2, ShieldCheck, Zap, Globe, Users, Menu } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { userId } = await auth();
  
  // We no longer force redirect at the top level so logged-in users can still see the landing page.


  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 tracking-tight">
              Campusore
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#features">Features</Link>
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#solutions">Solutions</Link>
            <Link className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors" href="#pricing">Pricing</Link>
            <div className="h-4 w-px bg-border"></div>
            {userId ? (
              <Button render={<Link href="/dashboard" />} className="rounded-full px-6 shadow-md shadow-primary/20">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-bold text-primary hover:underline underline-offset-4">Log In</Link>
                <Button render={<Link href="/sign-up" />} className="rounded-full px-6 shadow-md shadow-primary/20">
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-6 w-6" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-xs h-full flex flex-col justify-start p-8">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-2xl font-black text-primary">Campusore</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6">
                  <Link href="#features" className="text-lg font-bold">Features</Link>
                  <Link href="#solutions" className="text-lg font-bold">Solutions</Link>
                  <Link href="#pricing" className="text-lg font-bold">Pricing</Link>
                  <div className="pt-4 border-t">
                    {userId ? (
                      <Button render={<Link href="/dashboard" />} className="w-full rounded-xl">Go to Dashboard</Button>
                    ) : (
                      <div className="space-y-4">
                        <Button render={<Link href="/sign-up" />} className="w-full rounded-xl">Get Started</Button>
                        <Button render={<Link href="/sign-in" />} variant="outline" className="w-full rounded-xl">Log In</Button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden text-left">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Version 2.0 • The Future of Education
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] text-slate-950">
                  Operating <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-indigo-600 font-serif italic pr-4">Excellence</span> <br />
                  For Schools
                </h1>
                
                <p className="max-w-2xl mx-auto lg:mx-0 text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                  Campusore is the definitive multi-tenant ERP for forward-thinking institutions. Transform administration into a competitive advantage.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
                  {userId ? (
                    <Button render={<Link href="/dashboard" />} size="lg" className="rounded-2xl h-16 px-12 text-lg font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                      Go to Your Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  ) : (
                    <Button render={<Link href="/sign-up" />} size="lg" className="rounded-2xl h-16 px-12 text-lg font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                      Launch Your Campus <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                  <Link href="#solutions">
                    <Button variant="outline" size="lg" className="rounded-2xl h-16 px-12 text-lg font-bold bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50">
                      Explore Solutions
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Product Preview / Visual */}
              <div className="lg:w-2/5 relative animate-float">
                <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-[60px] border border-white/50 backdrop-blur-3xl shadow-2xl flex items-center justify-center p-8">
                  <div className="w-full h-full bg-white rounded-[40px] shadow-inner overflow-hidden border border-slate-100 p-6 space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="h-4 w-24 bg-slate-100 rounded-full"></div>
                      <div className="h-8 w-8 bg-primary/10 rounded-full text-primary flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 w-full bg-slate-50 rounded-xl"></div>
                      <div className="h-8 w-[80%] bg-slate-50 rounded-xl"></div>
                      <div className="h-8 w-[90%] bg-slate-100 rounded-xl"></div>
                    </div>
                    <div className="pt-4">
                      <div className="h-32 w-full bg-primary/5 rounded-2xl border border-dashed border-primary/20"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-slate-950 text-white overflow-hidden relative border-y border-white/5">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-12 text-center">
              <div className="space-y-1">
                <div className="text-3xl font-black text-primary">500+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutions</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-primary">1M+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Users</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-primary">99.9%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime SLA</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-primary">24/7</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-white relative">
          <div className="container mx-auto px-4 text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 underline transition-all decoration-primary/30 hover:decoration-primary">Powerful <span className="italic text-primary">Capabilities</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl leading-relaxed font-medium">Engineered for institutions that demand excellence. Unified infrastructure for every department.</p>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Isolation Control", desc: "Advanced multi-tenant architecture with kernel-level data isolation via Supabase RLS.", icon: ShieldCheck, color: "bg-blue-50 text-blue-600" },
                { title: "Financial Ledger", desc: "Native Razorpay integration with automated invoicing, aging reports, and tax compliance.", icon: Zap, color: "bg-amber-50 text-amber-600" },
                { title: "Smart Flow", desc: "Automated student lifecycle management, from digital admissions to cloud marksheets.", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
                { title: "Faculty Hub", desc: "Professional grade teacher tools for curriculum planning, grading, and direct communication.", icon: Users, color: "bg-indigo-50 text-indigo-600" },
                { title: "Parent Portal", desc: "Zero-latency parent engagement with real-time academic progress and fee transparency.", icon: Globe, color: "bg-rose-50 text-rose-600" },
                { title: "Campus Engine", desc: "High-performance campus monitoring with live attendance and behavioral reporting.", icon: GraduationCap, color: "bg-purple-50 text-purple-600" },
              ].map((feat, i) => (
                <div key={i} className="group relative p-12 rounded-[50px] border border-slate-100 bg-white hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700">
                  <div className={`w-16 h-16 rounded-[22px] ${feat.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                    <feat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{feat.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2 space-y-12">
                <div className="space-y-4">
                  <h2 className="text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter">Unified OS for <br /><span className="text-primary italic">Every Stakeholder</span></h2>
                  <p className="text-xl text-slate-500 font-medium">One platform, zero friction. Whether you&apos;re an admin overseeing thousands or a parent checking grades.</p>
                </div>
                
                <div className="space-y-8">
                  {[
                    { title: "For Administrators", desc: "Global school cockpit with deep analytics and financial transparency.", icon: Users },
                    { title: "For Educators", desc: "Intuitive workflows for attendance, grading, and digital classroom management.", icon: Zap },
                    { title: "For Families", desc: "Real-time mobile updates for progress, fees, and institution events.", icon: Globe }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:border-primary/20 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-all font-black text-xl">0{i+1}</div>
                      <div>
                        <h4 className="font-black text-2xl text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="aspect-square bg-white rounded-[60px] shadow-2xl overflow-hidden border border-slate-100 p-2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 group-hover:opacity-0 transition-opacity"></div>
                  <div className="w-full h-full rounded-[50px] bg-slate-50 flex items-center justify-center p-12">
                     <div className="text-center space-y-6">
                        <div className="text-primary font-black text-9xl italic tracking-tighter animate-pulse">98%</div>
                        <div className="font-black text-2xl uppercase tracking-[0.2em] text-slate-400">Efficiency Surge</div>
                     </div>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary rounded-3xl rotate-12 -z-10 blur-2xl opacity-10"></div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500 rounded-full -z-10 blur-3xl opacity-10 animate-pulse"></div>
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
        <section id="subscribe" className="py-32">
          <div className="container mx-auto px-4">
            <div className="bg-slate-950 rounded-[60px] p-12 md:p-24 text-white text-center space-y-12 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-6">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8]">Ready to scale? <br /> <span className="text-primary italic">Join the elite.</span></h2>
                <p className="text-slate-400 max-w-xl mx-auto text-xl font-medium">Campusore is chosen by over 500 institutions for its uncompromising performance and security. Deploy in minutes.</p>
                <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
                  <Button render={<Link href="/sign-up" />} size="lg" className="rounded-2xl h-16 px-12 text-lg font-black shadow-xl shadow-primary/20 w-full sm:w-auto">
                    Get Started Instantly <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-2xl h-16 px-12 text-lg font-bold border-white/10 hover:bg-white/5 w-full sm:w-auto backdrop-blur-md">
                    Talk to our Solution Team
                  </Button>
                </div>
              </div>
              
              {/* Background Glows */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
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
              <span className="text-2xl font-black tracking-tight">Campusore</span>
            </div>
            
            <div className="flex gap-12 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; 2026 Campusore Platform. All rights reserved. Designed for excellence.
          </div>
        </div>
      </footer>
    </div>
  );
}
