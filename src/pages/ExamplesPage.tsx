import React from "react";
import DocsLayout from "@/src/components/layout/DocsLayout";
import CodeBlock from "@/src/components/docs/CodeBlock";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Database, 
  Search, 
  Zap, 
  ArrowRight, 
  Box, 
  Layers,
  Terminal,
  ShieldCheck,
  GitBranch
} from "lucide-react";

const examples = [
  {
    id: "basic-setup",
    title: "Basic Setup",
    description: "Initialize Corem and define your first table using the simplified client.",
    code: `import { corem, sqlTable, int, varchar } from "@himanshupadecha/corem";

// 1. Initialize client (uses environment variables by default)
export const db = corem();

// 2. Define schema
export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement().notNull(),
  name: varchar("name", 255).notNull(),
  email: varchar("email", 255).notNull().unique(),
});`,
    language: "typescript",
    icon: Database
  },
  {
    id: "crud-operations",
    title: "CRUD Operations",
    description: "Complete lifecycle of a database record: Create, Read, Update, Delete.",
    code: `import { db, users } from "./schema";
import { eq } from "@himanshupadecha/corem";

// CREATE
await db.insert(users).values({
  name: "John Doe",
  email: "john@example.com"
}).execute();
/*
 * GENERATED SQL:
 * INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
 */

// READ
const user = await db.select()
  .from(users)
  .where(eq(users.columns.email, "john@example.com"))
  .execute();
/*
 * GENERATED SQL:
 * SELECT * FROM users WHERE users.email = 'john@example.com';
 */

// UPDATE
await db.update(users)
  .set({ name: "John Updated" })
  .where(eq(users.columns.id, 1))
  .execute();
/*
 * GENERATED SQL:
 * UPDATE users SET name = 'John Updated' WHERE users.id = 1;
 */

// DELETE
await db.delete()
  .from(users)
  .where(eq(users.columns.id, 1))
  .execute();
/*
 * GENERATED SQL:
 * DELETE FROM users WHERE users.id = 1;
 */`,
    language: "typescript",
    icon: Search
  },
  {
    id: "relationships",
    title: "One-to-Many Relationships",
    description: "Modeling relationships between users and posts using foreign keys.",
    code: `import { sqlTable, int, varchar, eq } from "@himanshupadecha/corem";

export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement().notNull(),
  name: varchar("name", 255).notNull(),
});

export const posts = sqlTable("posts", {
  id: int("id").primaryKey().autoIncrement(),
  title: varchar("title", 255).notNull(),
  userId: int("user_id")
    .references(() => users.columns.id, { onDelete: "cascade" })
    .notNull(),
});

// Querying with Joins
const postsWithAuthors = await db.select()
  .from(users)
  .innerJoin(posts, eq(users.columns.id, posts.columns.userId))
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * INNER JOIN posts ON users.id = posts.user_id;
 */`,
    language: "typescript",
    icon: Layers
  },
  {
    id: "complex-filters",
    title: "Complex Filters",
    description: "Using advanced operators and logical groups to find specific data.",
    code: `import { db, users } from "./schema";
import { eq, ne, gt, and, or, inArray, desc } from "@himanshupadecha/corem";

const advancedUsers = await db.select()
  .from(users)
  .where(
    and(
      eq(users.columns.isActive, true),
      or(
        gt(users.columns.id, 500),
        eq(users.columns.name, "John")
      )
    )
  )
  .orderBy(desc(users.columns.createdAt))
  .limit(10)
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * WHERE (users.is_active = true) AND (users.id > 500 OR users.name = 'John')
 * ORDER BY users.created_at DESC 
 * LIMIT 10;
 */`,
    language: "typescript",
    icon: Code2
  },
  {
    id: "transactions",
    title: "Database Transactions",
    description: "Execute multiple queries atomically to ensure data integrity.",
    code: `import { db, users, posts } from "./schema";

await db.transaction(async (tx) => {
  // All these operations occur within a single transaction
  await tx.insert(users).values({
    name: "New Creator",
    email: "creator@example.com"
  }).execute();
  
  await tx.insert(posts).values({
    title: "Getting Started with Corem",
    userId: 1
  }).execute();
  
  // If anything throws, the entire transaction is rolled back!
});`,
    language: "typescript",
    icon: ShieldCheck
  },
  {
     id: "cli-usage",
     title: "CLI & Migrations",
     description: "Managing your schema changes through the terminal.",
     code: `# 1. Push changes directly to DB (zero-config sync)
npx corem push

# 2. Get help on commands
npx corem --help`,
     language: "bash",
     icon: Terminal
  }
];

export default function ExamplesPage() {
  const toc = examples.map(ex => ({ id: ex.id, title: ex.title }));

  return (
    <DocsLayout toc={toc}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Examples</h1>
          <p className="text-[15px] text-[#A1A1AA] leading-relaxed">
            Explore common patterns and use cases for Corem. Copy these snippets to jumpstart your project.
          </p>
        </div>

        <div className="grid gap-8">
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="scroll-mt-24 space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20">
                  <example.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">{example.title}</h2>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{example.description}</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#1E1E21] bg-[#09090B]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E21] bg-[#18181B]/50">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
                      <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
                      <div className="w-2 h-2 rounded-full bg-[#3F3F46]" />
                   </div>
                   <span className="text-[10px] font-mono text-[#52525B] uppercase tracking-widest">{example.language}</span>
                </div>
                <div className="p-0">
                  <CodeBlock 
                    code={example.code} 
                    language={example.language} 
                  />
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-transparent border border-[#7C3AED]/20 flex flex-col items-center text-center gap-6">
           <Zap className="h-10 w-10 text-[#A78BFA]" />
           <div>
             <h3 className="text-2xl font-bold text-white mb-2">Ready to scale?</h3>
             <p className="text-[#A1A1AA] max-w-lg">
               Corem handles complex schemas and high-throughput workloads without breaking a sweat.
             </p>
           </div>
           <div className="flex flex-wrap items-center justify-center gap-4">
              <a 
                href="/docs" 
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAFAFA] text-[#09090B] font-bold transition-all hover:scale-105 active:scale-95"
              >
                Go to Docs <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com/HimanshuPadecha/Corem" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#18181B] text-[#FAFAFA] border border-[#1E1E21] font-bold transition-all hover:bg-[#27272A]"
              >
                View on GitHub
              </a>
           </div>
        </div>
      </div>
    </DocsLayout>
  );
}
