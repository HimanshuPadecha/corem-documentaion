import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold text-[#52525B] uppercase tracking-[0.2em] bg-[#18181B] border-x border-t border-[#1E1E21] rounded-t-xl">
          <Terminal className="h-3.5 w-3.5" />
          {filename}
        </div>
      )}
      <div className={`relative overflow-hidden border border-[#1E1E21] bg-[#09090B] shadow-2xl ${filename ? 'rounded-b-xl' : 'rounded-xl'}`}>
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 z-10 p-2 rounded-lg bg-[#18181B] border border-[#1E1E21] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#27272A] text-[#FAFAFA]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[#7C3AED]" /> : <Copy className="h-3.5 w-3.5 text-[#52525B]" />}
        </button>
        <pre className="p-4 sm:p-5 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed">
          <code className={`language-${language}`}>
            {highlightCode(code, language)}
          </code>
        </pre>
      </div>
    </div>
  );
}

function highlightCode(code: string, lang: string) {
  // Simple token-based highlighter logic for demo
  const lines = code.trim().split("\n");
  return lines.map((line, i) => (
    <div key={i} className="flex">
      <span className="text-[#3F3F46] w-6 select-none mr-4 text-right opacity-50">{i + 1}</span>
      <span className="flex-1">
        {line.split(/(\.|\(|\)|\{|\}|\s|;|,|=>|"[^"]*"|'[^']*')/g).map((part, j) => {
           if (!part) return null;
           const trimmed = part.trim();
           // Keywords
           if (['import', 'export', 'const', 'let', 'type', 'interface', 'await', 'async', 'from', 'return'].includes(trimmed)) {
             return <span key={j} className="text-[#7C3AED] font-medium">{part}</span>;
           }
           // ORM Methods
           if (['select', 'from', 'where', 'insert', 'update', 'delete', 'execute', 'values', 'set', 'mysqlTable', 'serial', 'varchar', 'primaryKey'].includes(trimmed)) {
             return <span key={j} className="text-[#A78BFA]">{part}</span>;
           }
           // Strings
           if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
             return <span key={j} className="text-[#C4B5FD]">{part}</span>;
           }
           // Punctuation
           if (['(', ')', '{', '}', '.', ';', ',', '=>'].includes(trimmed)) {
             return <span key={j} className="text-[#3F3F46]">{part}</span>;
           }
           // Numbers
           if (!isNaN(Number(trimmed)) && trimmed !== '') {
             return <span key={j} className="text-[#C4B5FD] font-mono">{part}</span>;
           }
           // Types/Functions
           if (trimmed && trimmed[0] === trimmed[0].toUpperCase() && isNaN(Number(trimmed[0]))) {
             return <span key={j} className="text-[#FAFAFA]">{part}</span>;
           }
           return <span key={j} className="text-[#A1A1AA]">{part}</span>;
        })}
      </span>
    </div>
  ));
}
