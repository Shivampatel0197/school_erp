"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Users,
    BookOpen,
    Calendar,
    FileText,
    Settings,
    GraduationCap,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("hidden md:flex flex-col w-64 border-r bg-white h-full", className)}>
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-tight text-primary uppercase">CampusCore</h2>
            </div>
            <SidebarContent />
            <div className="p-4 border-t">
                <div className="text-xs text-muted-foreground text-center">
                    &copy; 2026 CampusCore v1.0
                </div>
            </div>
        </div>
    );
}

export function SidebarContent() {
    const pathname = usePathname();
    const { user } = useUser();
    const role = user?.publicMetadata?.role as string || "admin";

    const adminLinks = [
        { title: "Dashboard", href: "/admin", icon: BarChart3 },
        { title: "Students", href: "/admin/students", icon: Users },
        { title: "Teachers", href: "/admin/teachers", icon: GraduationCap },
        { title: "Classes", href: "/admin/classes", icon: BookOpen },
        { title: "Fees", href: "/admin/fees", icon: FileText },
        { title: "Announcements", href: "/admin/announcements", icon: Bell },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const teacherLinks = [
        { title: "Dashboard", href: "/teacher", icon: BarChart3 },
        { title: "Attendance", href: "/teacher/attendance", icon: Users },
        { title: "Assignments", href: "/teacher/assignments", icon: FileText },
        { title: "Timetable", href: "/teacher/timetable", icon: Calendar },
    ];

    const studentLinks = [
        { title: "Dashboard", href: "/student", icon: BarChart3 },
        { title: "Assignments", href: "/student/assignments", icon: FileText },
        { title: "Exams & Results", href: "/student/exams", icon: BookOpen },
        { title: "Timetable", href: "/student/timetable", icon: Calendar },
    ];

    const parentLinks = [
        { title: "Dashboard", href: "/parent", icon: BarChart3 },
        { title: "My Children", href: "/parent/children", icon: Users },
        { title: "Fee Payments", href: "/parent/fees", icon: FileText },
    ];

    const links = 
        role === "admin" ? adminLinks : 
        role === "teacher" ? teacherLinks : 
        role === "parent" ? parentLinks : 
        studentLinks;

    return (
        <div className="flex-1 overflow-y-auto px-4 space-y-2 py-4">
            {links.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                    <Link
                        key={link.title}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "text-muted-foreground hover:bg-slate-100"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.title}
                    </Link>
                );
            })}
        </div>
    );
}

