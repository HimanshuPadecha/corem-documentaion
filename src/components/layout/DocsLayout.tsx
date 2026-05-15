import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { AnimatePresence } from "motion/react";
import PageTransition from "./PageTransition";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarItems } from "@/src/data/sidebar";

interface TocItem {
  id: string;
  title: string;
}

export default function DocsLayout({ children, toc }: { children: React.ReactNode; toc?: TocItem[] }) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Derive breadcrumbs from path
  const paths = location.pathname.split("/").filter(Boolean);
  
  const defaultToc: TocItem[] = [
    { id: "overview", title: "Overview" },
    { id: "getting-started", title: "Getting Started" },
    { id: "installation", title: "Installation" },
    { id: "configuration", title: "Configuration" },
    { id: "examples", title: "Examples" },
    { id: "next-steps", title: "Next Steps" },
  ];

  const displayToc = toc || defaultToc;
  
  return (
    <div className="flex h-screen flex-col relative bg-[#09090B] overflow-hidden">
      {/* Decorative Radial backgrounds - fixed and behind everything */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7C3AED]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#C4B5FD]/5 blur-[100px] rounded-full"></div>
      </div>



      <div className="flex flex-1 overflow-hidden pt-14 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop Sidebar - fixed height, independent scroll */}
        <div className="hidden md:block w-64 h-full overflow-y-auto no-scrollbar border-r border-[#1E1E21] shrink-0 z-10 transition-all">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Trigger & Breadcrumbs Bar */}
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-[#09090B]/80 backdrop-blur-md border-b border-[#1E1E21] px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                        <Menu className="h-4 w-4" />
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-[#09090B] p-0 border-[#1E1E21] w-72">
                        <div className="p-6 border-b border-[#1E1E21]">
                            <span className="font-bold text-xl">Corem Docs</span>
                        </div>
                        <ScrollArea className="h-[calc(100vh-5rem)] p-4">
                            <div className="space-y-6">
                                {sidebarItems.map((section) => (
                                    <div key={section.title} className="px-2">
                                        <h4 className="mb-2 text-[11px] font-bold text-[#52525B] uppercase tracking-[0.1em]">
                                            {section.title}
                                        </h4>
                                        <div className="space-y-1">
                                            {section.items?.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    to={item.href || "#"}
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                                                        location.pathname === item.href
                                                            ? "text-primary bg-primary/10"
                                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                                    }`}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
                <Breadcrumb className="text-[10px]">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="truncate max-w-[120px] text-[#A1A1AA]">
                                {paths[paths.length - 1]?.replace(/-/g, " ")}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>

        {/* Main Content Area - Scrollable container for the rest of the window */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar relative z-10">
          <main className="flex-1 w-full flex">
            <div className="flex-1 w-full md:pl-10">
               <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
                  <div className="w-full min-w-0 max-w-3xl pt-24 md:pt-8 pb-16">
                    {/* Desktop Breadcrumbs */}
                    <Breadcrumb className="mb-6 hidden md:flex text-[10px]">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-[#52525B] hover:text-[#A1A1AA]">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-[#1E1E21]" />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/docs" className="text-[#52525B] hover:text-[#A1A1AA]">Docs</BreadcrumbLink>
                            </BreadcrumbItem>
                            {paths.length > 2 && (
                                <>
                                    <BreadcrumbSeparator className="text-[#1E1E21]" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="capitalize text-[#A1A1AA]">{paths[paths.length - 1]?.replace(/-/g, " ")}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <AnimatePresence mode="wait">
                      <PageTransition key={location.pathname}>
                        {children}
                      </PageTransition>
                    </AnimatePresence>
                    
                    {/* Prev/Next Navigation */}
                    <DocNavigation />
                  </div>

                  {/* Table of Contents (Right Side) */}
                  <aside className="hidden lg:block pt-8 pb-12 border-l border-[#1E1E21] pl-8">
                    <div className="sticky top-0">
                      <h5 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#FAFAFA]">On this page</h5>
                      <ul className="space-y-2 text-[13px] text-[#52525B]">
                          {displayToc.map((item) => (
                            <li key={item.id}>
                              <a href={`#${item.id}`} className="hover:text-[#A1A1AA] cursor-pointer transition-colors block py-0.5">
                                {item.title}
                              </a>
                            </li>
                          ))}
                      </ul>

                      <div className="mt-12 p-4 rounded-lg bg-[#18181B] border border-[#1E1E21]">
                        <p className="text-[10px] text-[#52525B] uppercase font-bold tracking-widest mb-2">Latest Update</p>
                        <p className="text-xs text-[#A1A1AA]">v1.4.2 released with support for MySQL 8.4 JSON features.</p>
                      </div>
                    </div>
                  </aside>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DocNavigation() {
    const location = useLocation();
    const allItems = sidebarItems.flatMap(section => section.items || []);
    
    // Find the current active item. Handle "/docs" mapping to the first introduction item.
    const currentIndex = allItems.findIndex(item => 
        location.pathname === item.href || (location.pathname === "/docs" && item.href === "/docs")
    );
    
    const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
    const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

    if (!prev && !next) return null;

    return (
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-[#1E1E21]">
            {prev ? (
                <Link to={prev.href || "#"} className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-[#1E1E21] hover:border-primary/50 bg-[#18181B]/40 transition-all w-full sm:w-1/2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#52525B] group-hover:text-[#A1A1AA] transition-colors">Previous</span>
                    <span className="font-semibold text-sm flex items-center gap-1">
                        <ChevronRight className="h-4 w-4 rotate-180" /> {prev.title}
                    </span>
                </Link>
            ) : <div className="hidden sm:block w-1/2" />}
            
            {next ? (
                <Link to={next.href || "#"} className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-[#1E1E21] hover:border-primary/50 bg-[#18181B]/40 transition-all w-full sm:w-1/2 text-right">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#52525B] group-hover:text-[#A1A1AA] transition-colors">Next</span>
                    <span className="font-semibold text-sm flex items-center gap-1">
                        {next.title} <ChevronRight className="h-4 w-4" />
                    </span>
                </Link>
            ) : <div className="hidden sm:block w-1/2" />}
        </div>
    );
}
