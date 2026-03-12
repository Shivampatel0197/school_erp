"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Bell, Send } from "lucide-react";

export default function AnnouncementsPage() {
    const previousAnnouncements = [
        { id: 1, title: "Half Yearly Exams Rescheduled", target: "Students & Parents", date: "Oct 15, 2026", status: "Published" },
        { id: 2, title: "Staff Meeting on Friday", target: "Teachers", date: "Oct 12, 2026", status: "Published" },
    ];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                <p className="text-muted-foreground">Publish important notices to teachers, students, or parents.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Create Announcement</CardTitle>
                        <CardDescription>Compose a new notice to be displayed on dashboards.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input placeholder="E.g., Tomorrow is a Holiday" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Target Audience</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>All Users</option>
                                <option>Teachers Only</option>
                                <option>Students & Parents</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message Body</label>
                            <Textarea placeholder="Type your announcement here..." className="min-h-[120px]" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full"><Send className="mr-2 h-4 w-4" /> Publish Announcement</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Announcements</CardTitle>
                        <CardDescription>History of published notices.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {previousAnnouncements.map((announcement) => (
                                <div key={announcement.id} className="border-b last:border-0 pb-4 last:pb-0">
                                    <div className="font-semibold">{announcement.title}</div>
                                    <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                                        <div>To: <span className="text-primary font-medium">{announcement.target}</span></div>
                                        <div>{announcement.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
