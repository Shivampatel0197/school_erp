import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, BookOpen, Users, Settings } from "lucide-react";

export default function ClassesPage() {
    const classes = [
        { title: "Grade 10 - A", students: 32, subjects: ["Math", "Physics", "English"], teacher: "Dr. Turing" },
        { title: "Grade 10 - B", students: 28, subjects: ["Math", "Chemistry", "English"], teacher: "Ms. Smith" },
        { title: "Grade 9 - A", students: 35, subjects: ["Math", "Biology", "History"], teacher: "Mr. Doe" },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Classes & Subjects</h2>
                    <p className="text-muted-foreground">Manage school classes, sections, and assigned subjects.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><BookOpen className="mr-2 h-4 w-4" /> Add Subject</Button>
                    <Button><Plus className="mr-2 h-4 w-4" /> Add Class</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {classes.map((cls) => (
                    <Card key={cls.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">{cls.title}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 mt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" /> {cls.students} Students
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">Class Teacher:</span> {cls.teacher}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {cls.subjects.map(sub => (
                                        <span key={sub} className="text-xs border px-2 py-1 rounded-full bg-slate-50">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
