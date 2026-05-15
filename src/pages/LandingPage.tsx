import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Zap, 
  ShieldCheck, 
  Database, 
  GitBranch, 
  ArrowRight, 
  Github,
  CheckCircle,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  Code2 as CodeIcon
} from "lucide-react";
import PageTransition from "@/src/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";


function Speedometer(props: any) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

const features = [
  {
    title: "Type-Safe Queries",
    description: "Enjoy full IDE autocomplete and compile-time type checking for all your database queries.",
    icon: ShieldCheck,
  },
  {
    title: "SQL-Like Syntax",
    description: "Queries that feel like regular SQL, but with the power and safety of TypeScript.",
    icon: CodeIcon,
  },
  {
    title: "Migration System",
    description: "A robust schema migration toolkit that keeps your database in sync with your code.",
    icon: GitBranch,
  },
  {
    title: "Zero Runtime Overhead",
    description: "Lightweight architecture that generates efficient SQL without unnecessary abstractions.",
    icon: Zap,
  },
  {
    title: "Fast Execution",
    description: "Highly optimized driver interactions for maximum performance and low latency.",
    icon: Speedometer,
  },
  {
    title: "Fluent Builder",
    description: "A natural query builder API that makes complex joins and filters easy to write.",
    icon: Layers,
  },
  {
    title: "Relationship Support",
    description: "Define one-to-one, one-to-many, and many-to-many relations with ease.",
    icon: Database,
  },
  {
    title: "Integrated CLI",
    description: "Powerful command-line tools for generating migrations and inspecting your schema.",
    icon: Terminal,
  },
];

const exampleScripts = {
  select: `await db
  .select()
  .from(users)
  .where(eq(users.columns.id, 1))
  .execute();`,
  insert: `await db
  .insert(users)
  .values({
    name: "John Doe",
    email: "john@example.com"
  })
  .execute();`,
  update: `await db
  .update(users)
  .set({ name: "Updated Name" })
  .where(eq(users.columns.id, 1))
  .execute();`,
  delete: `await db
  .delete()
  .from(users)
  .where(eq(users.columns.id, 10))
  .execute();`
};

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen bg-[#09090B] overflow-x-clip">
      <PageTransition>
      {/* Background patterns and glows from theme */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7C3AED]/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#C4B5FD]/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1E1E21] bg-[#18181B] text-[10px] font-bold uppercase tracking-widest text-[#52525B] mb-8 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Latest: v1.4.2 is here
              </div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8 text-white">
                Modern Type-safe <br />
                <span className="text-[#7C3AED]">MySQL ORM</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg sm:text-xl text-[#A1A1AA] leading-relaxed mb-10">
                Build scalable SQL applications with a lightweight ORM and migration toolkit designed specifically for modern developers. <span className="text-[#FAFAFA] font-medium italic">Type-safe</span> everything.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button render={<Link to="/docs" />} nativeButton={false} size="lg" className="h-12 px-8 rounded-xl text-sm font-bold bg-[#7C3AED] hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/20">
                  <span className="flex items-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
                <Button variant="outline" size="lg" nativeButton={false} render={<a href="https://github.com/HimanshuPadecha/Corem" target="_blank" rel="noreferrer" />} className="h-12 px-8 rounded-xl text-sm font-bold border-[#1E1E21] bg-[#18181B]/40 hover:bg-[#18181B] transition-all">
                  <span className="flex items-center gap-2">
                    <Github className="h-5 w-5" /> GitHub
                  </span>
                </Button>
              </div>
            </motion.div>

            {/* Hero Code Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 lg:mt-24 relative mx-auto max-w-3xl"
            >
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] opacity-10 blur-3xl" />
              <div className="relative rounded-xl border border-[#1E1E21] bg-[#09090B] shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E21] bg-[#18181B]/50">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                  </div>
                  <div className="ml-4 text-[10px] font-mono text-[#52525B] uppercase tracking-widest leading-none">mysql-schema.ts</div>
                </div>
                <div className="p-6 sm:p-8 text-left font-mono text-sm leading-relaxed overflow-x-auto min-h-[200px]">
                   {/* Simplified code presentation for the hero */}
                   <div className="text-[#A1A1AA]">
                     <span className="text-[#7C3AED]">import</span> &#123; <span className="text-[#A78BFA]">sqlTable</span>, <span className="text-[#A78BFA]">int</span>, <span className="text-[#A78BFA]">varchar</span> &#125; <span className="text-[#7C3AED]">from</span> <span className="text-[#C4B5FD]">"@himanshupadecha/corem"</span>;<br /><br />
                     <span className="text-[#7C3AED]">export const</span> users = <span className="text-[#A78BFA]">sqlTable</span>(<span className="text-[#C4B5FD]">"users"</span>, &#123;<br />
                     &nbsp;&nbsp;id: <span className="text-[#A78BFA]">int</span>(<span className="text-[#C4B5FD]">"id"</span>).<span className="text-[#A78BFA]">primaryKey</span>().<span className="text-[#A78BFA]">autoIncrement</span>(),<br />
                     &nbsp;&nbsp;name: <span className="text-[#A78BFA]">varchar</span>(<span className="text-[#C4B5FD]">"name"</span>, <span className="text-[#C4B5FD]">255</span>).<span className="text-[#A78BFA]">notNull</span>(),<br />
                     &#125;);
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 border-t border-[#1E1E21] bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Built for Production</h2>
            <p className="text-[#52525B] text-sm uppercase tracking-[0.2em] font-bold">The features you actually need</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-[#1E1E21] bg-[#18181B]/40 hover:bg-[#18181B] transition-all group cursor-default">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples Playground */}
      <CodeExamplesSection />

      {/* Final CTA */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-black border-t border-[#1E1E21]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">Ready to build better?</h2>
          <p className="text-lg text-[#A1A1AA] mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of developers using Corem to build faster and more reliable MySQL applications.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" nativeButton={false} render={<Link to="/docs/installation" />} className="rounded-xl px-10 h-14 bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-sm transition-all shadow-xl shadow-[#7C3AED]/20">
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" nativeButton={false} render={<Link to="/docs" />} className="rounded-xl px-10 h-14 border-[#1E1E21] bg-[#18181B]/40 hover:bg-[#18181B] font-bold text-sm transition-all">
              Documentation
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1E1E21] py-16 bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]" />
                <span className="font-bold text-lg tracking-tight">Corem</span>
              </div>
              <p className="text-sm text-[#52525B] max-w-xs">
                The most lightweight and type-safe MySQL ORM for the modern TypeScript ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">
              <div className="space-y-4">
                <h4 className="font-bold text-[#FAFAFA] text-xs uppercase tracking-widest group">Links</h4>
                <ul className="space-y-2 text-[#52525B]">
                  <li><a href="#" className="hover:text-[#FAFAFA] transition-colors">Docs</a></li>
                  <li><a href="#" className="hover:text-[#FAFAFA] transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-[#FAFAFA] transition-colors">CLI</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-[#FAFAFA] text-xs uppercase tracking-widest">Community</h4>
                <ul className="space-y-2 text-[#52525B]">
                  <li><a href="https://github.com/HimanshuPadecha/Corem" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-[#FAFAFA] transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-[#FAFAFA] transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#1E1E21] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-[#52525B]">
            <p>© {new Date().getFullYear()} Corem Project. MIT Licensed.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FAFAFA] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#FAFAFA] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      </PageTransition>
    </div>
  );
}

function CodeExamplesSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof exampleScripts>("select");

  return (
    <section className="py-24 sm:py-32 border-t border-[#1E1E21] bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Simple, Intuitive API</h2>
            <p className="text-lg text-[#A1A1AA] mb-10 leading-relaxed">
              Corem provides a fluent API that mirrors SQL syntax while providing full type safety. No more guessing field names or types.
            </p>
            <div className="space-y-3">
              {Object.keys(exampleScripts).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof exampleScripts)}
                  className={cn(
                    "flex items-center justify-between w-full p-4 rounded-xl border transition-all text-left group",
                    activeTab === key
                      ? "bg-[#18181B] border-[#7C3AED]/50 text-white shadow-lg shadow-[#7C3AED]/10"
                      : "bg-transparent border-[#1E1E21] text-[#52525B] hover:bg-[#18181B]/40 hover:border-[#3F3F46]"
                  )}
                >
                  <span className={cn(
                    "capitalize text-sm font-bold tracking-tight",
                    activeTab === key ? "text-[#FAFAFA]" : "group-hover:text-[#A1A1AA]"
                  )}>{key} Records</span>
                  {activeTab === key && <CheckCircle className="h-4 w-4 text-[#7C3AED]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#7C3AED]/10 to-[#A78BFA]/10 blur-2xl" />
            <div className="relative rounded-xl border border-[#1E1E21] bg-[#09090B] overflow-hidden shadow-2xl">
               <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E21] bg-[#18181B]/50">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3F3F46]" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#52525B] uppercase tracking-widest leading-none">
                    <Terminal className="h-3 w-3" /> main.ts
                  </div>
                </div>
                <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto min-h-[220px]">
                   <pre key={activeTab} className="text-[#A1A1AA]">
                     {getCodeMarkup(exampleScripts[activeTab])}
                   </pre>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getCodeMarkup(code: string | undefined) {
  if (!code) return null;
  // Simple highlighter fallback
  const lines = code.trim().split('\n');
  return lines.map((line, i) => (
    <div key={i} className="flex">
      <span className="text-muted-foreground w-6 select-none opacity-30">{i+1}</span>
      <span className="flex-1 whitespace-pre">
        {line.split(/(\.|\(|\)|\{|\}|\s|;|,|=>|"[^"]*"|'[^']*')/g).map((part, j) => {
          if (!part) return null;
          const trimmed = part.trim();
          if (['await', 'db', 'select', 'from', 'where', 'insert', 'update', 'delete', 'set', 'values', 'execute'].includes(trimmed)) {
            return <span key={j} className="text-purple-400">{part}</span>;
          }
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return <span key={j} className="text-emerald-400">{part}</span>;
          }
          if (['(', ')', '{', '}', '.', ';', ',', '=>'].includes(trimmed)) return <span key={j} className="text-zinc-500">{part}</span>;
          if (!isNaN(Number(trimmed)) && trimmed !== '') return <span key={j} className="text-orange-400">{part}</span>;
          return <span key={j} className="text-blue-200">{part}</span>;
        })}
      </span>
    </div>
  ));
}
