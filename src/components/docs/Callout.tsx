import React from "react";
import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
}

export default function Callout({ children, type = "info", title }: CalloutProps) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    tip: Lightbulb,
    danger: AlertCircle,
  };

  const styles = {
    info: "border-[#1E1E21] bg-[#18181B]/40 text-[#A1A1AA]",
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-200/80",
    tip: "border-[#7C3AED]/20 bg-[#7C3AED]/5 text-[#C4B5FD]/80",
    danger: "border-red-500/20 bg-red-500/5 text-red-200/80",
  };

  const iconColors = {
    info: "text-[#52525B]",
    warning: "text-amber-500",
    tip: "text-[#7C3AED]",
    danger: "text-red-500",
  };

  const Icon = icons[type];

  return (
    <div className={cn("my-8 flex gap-4 rounded-xl border p-5 transition-all hover:bg-[#18181B]/60", styles[type])}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconColors[type])} />
      <div className="flex-1 space-y-2">
        {title && <div className="font-bold uppercase tracking-[0.2em] text-[10px] opacity-100 text-[#FAFAFA]">{title}</div>}
        <div className="text-[13px] leading-6">{children}</div>
      </div>
    </div>
  );
}
