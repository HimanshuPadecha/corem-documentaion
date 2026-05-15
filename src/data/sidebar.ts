import {
  BookOpen,
  Code2,
  Database,
  Download,
  FileCode2,
  GitBranch,
  Layers,
  Layout,
  MessageSquare,
  Package,
  Plus,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  items?: NavItem[];
}

export const sidebarItems: NavItem[] = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Database Connection", href: "/docs/database-connection" },
    ],
  },
  {
    title: "Schema",
    icon: Database,
    items: [
      { title: "Defining Schema", href: "/docs/schema" },
      { title: "Types & Columns", href: "/docs/types" },
      { title: "Relationships", href: "/docs/relationships" },
      { title: "Constraints", href: "/docs/constraints" },
    ],
  },
  {
    title: "Queries",
    icon: Search,
    items: [
      { title: "Select", href: "/docs/select" },
      { title: "Insert", href: "/docs/insert" },
      { title: "Update", href: "/docs/update" },
      { title: "Delete", href: "/docs/delete" },
      { title: "Joins", href: "/docs/joins" },
      { title: "Filters & Operators", href: "/docs/filters" },
    ],
  },
  {
    title: "Migrations",
    icon: GitBranch,
    items: [
      { title: "Overview", href: "/docs/migrations" },
      { title: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Advanced",
    icon: Zap,
    items: [
      { title: "Transactions", href: "/docs/transactions" },
      { title: "Raw SQL", href: "/docs/raw-sql" },
      { title: "API Reference", href: "/docs/api-reference" },
    ],
  },
  {
    title: "Learning",
    icon: BookOpen,
    items: [
      { title: "Examples", href: "/examples" },
    ],
  },
];
