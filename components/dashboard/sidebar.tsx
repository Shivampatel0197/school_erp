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

export function Sidebar() {
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

    const links = role === "admin" ? adminLinks : role === "teacher" ? teacherLinks : studentLinks;

    return (
        <div className="hidden md:flex flex-col w-64 border-r bg-white h-full">
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-tight text-primary">EduSaaS</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 space-y-2">
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
            <div className="p-4 border-t">
                <div className="text-xs text-muted-foreground text-center">
                    &copy; 2026 EduSaaS v1.0
                </div>
            </div>
        </div>
    );
}
