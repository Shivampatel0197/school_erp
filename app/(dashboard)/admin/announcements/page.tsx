"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Bell, Send, Loader2, Info } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function AnnouncementsPage() {
    const { user } = useUser();
    const schoolId = user?.publicMetadata?.schoolId as string;
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [audience, setAudience] = useState("all");
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);

    const fetchAnnouncements = async () => {
        if (!schoolId) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });
        
        if (data) setAnnouncements(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [schoolId]);

    const handlePublish = async () => {
        if (!title || !content || !schoolId) return;
        setPublishing(true);
        
        const { error } = await supabase.from('announcements').insert([
            { 
                title, 
                content, 
                target_audience: audience, 
                school_id: schoolId 
            }
        ]);

        if (!error) {
            setTitle("");
            setContent("");
            fetchAnnouncements();
        }
        setPublishing(false);
    };

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                <p className="text-muted-foreground">Publish important notices to teachers, students, or parents.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Create Announcement</CardTitle>
                        <CardDescription>Compose a new notice to be displayed on dashboards.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input 
                                placeholder="E.g., Tomorrow is a Holiday" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Target Audience</label>
                            <select 
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="all">All Users</option>
                                <option value="teachers">Teachers Only</option>
                                <option value="students">Students Only</option>
                                <option value="parents">Parents Only</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message Body</label>
                            <Textarea 
                                placeholder="Type your announcement here..." 
                                className="min-h-[120px]" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handlePublish} disabled={publishing}>
                            {publishing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                            Publish Announcement
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Announcements</CardTitle>
                        <CardDescription>History of published notices for your school.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex h-32 items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        ) : announcements.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-32 text-center">
                                <Info className="h-8 w-8 text-slate-300 mb-2" />
                                <p className="text-slate-400 text-sm">No announcements published yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div key={announcement.id} className="border-b last:border-0 pb-4 last:pb-0">
                                        <div className="font-semibold text-slate-800">{announcement.title}</div>
                                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{announcement.content}</p>
                                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                                            <div>To: <span className="text-primary font-medium capitalize">{announcement.target_audience}</span></div>
                                            <div>{new Date(announcement.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
