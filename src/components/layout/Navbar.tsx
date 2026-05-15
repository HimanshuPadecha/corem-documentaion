import { Link, useLocation } from "react-router-dom";
import { Github, Search, Menu, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-[#1E1E21] bg-[#09090B]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-white font-bold text-lg shadow-lg shadow-[#7C3AED]/20 group-hover:scale-110 transition-transform">
              C
            </div>
            <span className="text-lg font-bold tracking-tight">Corem</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/docs/api-reference"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              API Reference
            </Link>
            <Link
              to="/examples"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Examples
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SearchDialog />
          
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="icon" nativeButton={false} render={<a href="https://github.com/HimanshuPadecha/Corem" target="_blank" rel="noreferrer" />}>
                <Github className="h-5 w-5" />
            </Button>
          </div>

          {location.pathname !== "/docs/installation" && (
            <Button render={<Link to="/docs/installation" />} nativeButton={false} className="hidden sm:inline-flex rounded-full px-6">
              Get Started
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors sm:w-64" />}>
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search documentation...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/20 bg-white/5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden bg-zinc-950 border-white/10">
        <DialogHeader className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Type to search..."
              className="border-none bg-transparent focus-visible:ring-0 text-lg p-0 h-auto"
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto p-2">
          <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Links
          </div>
          {[
            "Introduction",
            "Installation",
            "Defining Schema",
            "Querying Data",
            "Migrations",
          ].map((item) => (
            <button
              key={item}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-left transition-colors group"
            >
              <FileCode2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              {item}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FileCode2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  );
}
