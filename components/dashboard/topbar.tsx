"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarContent } from "./sidebar";

export function Topbar() {
    const [search, setSearch] = useState("");

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <Dialog>
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[280px] p-0 h-[100dvh] rounded-none left-[140px]">
                        <DialogHeader className="p-6 border-b">
                            <DialogTitle className="text-primary font-black uppercase tracking-tighter">EduSaaS Menu</DialogTitle>
                        </DialogHeader>
                        <SidebarContent />
                    </DialogContent>
                </Dialog>
                
                <div className="hidden md:flex relative w-96 group">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        type="search"
                        placeholder="Search dashboard..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-slate-50 border-none w-full focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                </Button>
                <div className="h-8 w-px bg-border mx-1"></div>
                <UserButton />
            </div>
        </header>
    );
}

