import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/src/data/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 pt-8 pb-12 pr-6 pl-0">
      <div className="space-y-6">
          {sidebarItems.map((section) => (
            <div key={section.title} className="px-4">
              <h4 className="mb-4 text-[11px] font-bold text-[#52525B] uppercase tracking-[0.1em] flex items-center gap-2">
                {section.icon && <section.icon className="h-3 w-3" />}
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items?.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href || "#"}
                      className={cn(
                        "block px-3 py-2 text-sm transition-all duration-200 rounded-lg group relative",
                        isActive
                          ? "text-primary font-medium bg-primary/5 border-l-2 border-primary pl-4"
                          : "text-muted-foreground hover:text-white hover:bg-white/5 pl-3 border-l-2 border-transparent"
                      )}
                    >
                      {item.title}
                      {isActive && (
                        <div className="absolute left-[-1px] top-0 h-full w-[2px] bg-primary blur-[2px]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
