import React from "react";
import { useParams, Navigate } from "react-router-dom";
import DocsLayout from "@/src/components/layout/DocsLayout";
import CodeBlock from "@/src/components/docs/CodeBlock";
import Callout from "@/src/components/docs/Callout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function DocsPage() {
  const { slug } = useParams();

  // Redirect /docs to /docs/introduction
  if (!slug) {
    return <Navigate to="/docs/introduction" replace />;
  }

  const content = getDocContent(slug);

  if (!content) {
    return (
      <DocsLayout>
        <div className="py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-8">This documentation page doesn't exist yet.</p>
            <Button render={<a href="/docs" />} nativeButton={false}>
                Back to Overview
            </Button>
        </div>
      </DocsLayout>
    );
  }

  const toc = content.sections
    .filter((s: any) => s.title)
    .map((s: any) => ({ id: s.id, title: s.title }));

  return (
    <DocsLayout toc={toc}>
      <article className="prose prose-invert prose-zinc max-w-none">
        <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">{content.title}</h1>
            <p className="text-base text-[#A1A1AA] leading-relaxed">{content.description}</p>
        </div>

        <div className="space-y-12">
            {content.sections.map((section, idx) => (
                <section key={idx} id={section.id} className="scroll-mt-24">
                    {section.title && <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2 group">
                        {section.title}
                        <a href={`#${section.id}`} className="opacity-0 group-hover:opacity-100 text-[#7C3AED] transition-opacity font-mono ml-2">#</a>
                    </h2>}
                    <div className="text-[15px] text-[#A1A1AA] leading-relaxed mb-4 whitespace-pre-wrap prose-strong:text-white prose-code:text-[#A78BFA] prose-code:bg-[#18181B] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none">
                        <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                    {section.code && (
                        <div className="mt-4 mb-8">
                            <CodeBlock 
                                code={section.code} 
                                language={section.language} 
                                filename={section.filename} 
                            />
                        </div>
                    )}
                    {section.callout && (
                        <div className="mt-4 mb-8">
                            <Callout type={section.callout.type} title={section.callout.title}>
                                {section.callout.text}
                            </Callout>
                        </div>
                    )}
                </section>
            ))}
        </div>
      </article>
    </DocsLayout>
  );
}

// Mock content data
function getDocContent(slug: string) {
  const docs: Record<string, any> = {
    introduction: {
      title: "Introduction to Corem",
      description: "Corem is a modern, lightweight, and fully type-safe MySQL ORM for TypeScript. It offers the performance of raw SQL queries combined with the strict typing of TypeScript, without the overhead of heavy abstractions.",
      sections: [
        {
          id: "what-is-corem",
          title: "What is Corem?",
          content: "Corem is designed for developers who love SQL but want the safety of static typing. Unlike traditional ORMs (like Prisma or TypeORM) that abstract away the database behind heavy object-oriented layers, Corem embraces a 'SQL-first' design. Your queries look and behave exactly like SQL, but with full autocomplete and compile-time checks.",
          callout: {
            type: "info",
            title: "Inspiration",
            text: "Corem was heavily inspired by the philosophy of Drizzle ORM, aiming to provide a seamless, lightweight developer experience for MySQL databases."
          }
        },
        {
          id: "why-corem",
          title: "Why choose Corem?",
          content: "We built Corem to solve the common frustrations developers face with existing database tools:",
        },
        {
          id: "key-benefits",
          content: "• **Zero Dependencies**: Corem is incredibly lightweight, keeping your node_modules small and your deployment fast.\n• **No Code Generation**: Say goodbye to complex build steps. Your schema is the source of truth, written in pure TypeScript.\n• **High Performance**: Corem acts as a thin wrapper over the database driver, ensuring zero abstraction cost on your queries.\n• **Built-in Migrations**: Manage your database schema effortlessly with our built-in CLI tool (npx corem push).",
        },
        {
          id: "philosophy",
          title: "Core Philosophy",
          content: "If you know SQL, you already know Corem. We don't invent new terminology or complex query objects. We provide a fluent API that closely maps to standard SQL operations (SELECT, INSERT, UPDATE, DELETE, JOIN), ensuring you have complete control over what is executed on your database.",
        },
        {
          id: "quick-look",
          title: "A Quick Look",
          content: "Here is a glimpse of how natural and type-safe it feels to query your database with Corem:",
          code: `import { db } from "./db";
import { users, posts } from "./schema";
import { eq } from "@himanshupadecha/corem";

// A fully typed SQL query with joins!
const result = await db
  .select({
    userId: users.columns.id,
    userName: users.columns.name,
    postTitle: posts.columns.title
  })
  .from(users)
  .leftJoin(posts, eq(users.columns.id, posts.columns.userId))
  .where(eq(users.columns.isActive, true))
  .execute();
  
console.log(result[0].userName); // TypeScript knows this exists!`,
          filename: "example.ts"
        }
      ]
    },
    installation: {
      title: "Installation & Quick Start",
      description: "Install Corem and set up your first database connection in minutes.",
      sections: [
        {
          id: "install",
          title: "1. Installation",
          content: "Install `corem` alongside its peer dependencies (such as `mysql2` if you haven't already) using your favorite package manager:",
          code: `# Using npm
npm install @himanshupadecha/corem mysql2

# Using yarn
yarn add @himanshupadecha/corem mysql2

# Using pnpm
pnpm add @himanshupadecha/corem mysql2`,
          language: "bash",
          filename: "terminal"
        },
        {
          id: "structure",
          title: "2. Project Structure",
          content: "After completing the setup, your project structure should look similar to this:",
          code: `my-app/
├── node_modules/
├── src/
│   └── db/
│       ├── index.ts      # Database connection client
│       └── schema.ts     # Type-safe table definitions
├── .env                  # Database credentials
├── corem.config.ts       # CLI configuration
├── package.json
└── tsconfig.json`,
          language: "text",
          filename: "project-root"
        },
        {
          id: "env",
          title: "3. Setup Environment Variables",
          content: "Create a `.env` file in the root of your project:",
          code: `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=my_database`,
          language: "env",
          filename: ".env"
        },
        {
          id: "config",
          title: "4. Configure Corem",
          content: "Create a `corem.config.ts` file in your project root to tell the CLI where your schema lives and how to connect to the database.",
          code: `import { defineConfig } from "@himanshupadecha/corem/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  database: "mysql",
  credentials: {
    db_name: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USER!,
  },
});`,
          filename: "corem.config.ts"
        },
        {
          id: "schema",
          title: "5. Define Your Schema",
          content: "Define your tables using Corem's type-safe schema builder. Create `src/db/schema.ts`:",
          code: `import { int, varchar, timestamp } from "@himanshupadecha/corem";
import { sqlTable } from "@himanshupadecha/corem";

export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement().notNull(),
  name: varchar("name", 255).notNull(),
  email: varchar("email", 255).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});`,
          filename: "src/db/schema.ts"
        },
        {
          id: "cli",
          title: "6. Push Schema to Database",
          content: "Use the built-in Corem CLI to automatically sync your defined schema with your MySQL database:",
          code: `npx corem push`,
          language: "bash",
          filename: "terminal"
        },
        {
          id: "init",
          title: "7. Initialize Database Client",
          content: "Create an instance of the database to execute queries. Create `src/db/index.ts`:",
          code: `import { corem } from "@himanshupadecha/corem";

// Initialize and export the database connection
export const db = await corem();`,
          filename: "src/db/index.ts"
        }
      ]
    },
    "database-connection": {
      title: "Database Connection",
      description: "Learn how to configure Corem and establish a secure connection to your MySQL database.",
      sections: [
        {
          id: "env-vars",
          title: "Environment Variables",
          content: "Corem relies on standard environment variables to establish the database connection securely without hardcoding credentials in your source code. Set up your `.env` file first:",
          code: `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=my_database`,
          language: "env",
          filename: ".env"
        },
        {
          id: "config",
          title: "The corem.config.ts File",
          content: "To enable the Corem CLI to manage your migrations and introspect your database, you must provide a configuration file at the root of your project. This file maps your schema path and connection credentials.",
          code: `import { defineConfig } from "@himanshupadecha/corem/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  database: "mysql",
  credentials: {
    db_name: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USER!,
  },
});`,
          filename: "corem.config.ts"
        },
        {
          id: "connecting",
          title: "Initializing the Client",
          content: "In your application code, initializing the database is as simple as calling the `corem()` function. Under the hood, Corem automatically reads your environment variables and sets up a high-performance connection pool.",
          code: `import { corem } from "@himanshupadecha/corem";

// Initialize and export the database connection
// Make sure this file is executed after your environment variables are loaded!
export const db = await corem();`,
          filename: "src/db/index.ts"
        }
      ]
    },
    schema: {
        title: "Defining Schema",
        description: "Scale your application with type-safe schema definitions that serve as the source of truth for both your code and your database.",
        sections: [
          {
            id: "defining-tables",
            title: "Defining Tables",
            content: "Use the sqlTable function to define your database structure in TypeScript.",
            code: `import { sqlTable, int, varchar, timestamp } from "@himanshupadecha/corem";

export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement().notNull(),
  name: varchar("name", 255).notNull(),
  email: varchar("email", 255).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});`,
            filename: "schema.ts"
          }
        ]
      },
    types: {
      title: "Types & Columns",
      description: "Comprehensive list of supported column types and mapping in Corem.",
      sections: [
        {
          id: "comprehensive-schema",
          title: "Comprehensive Schema Example",
          content: "Corem supports all standard MySQL column types. Here is a complete schema example demonstrating how to use every available column type, including strings, numerics, date-time, booleans, and enums.",
          code: `import { 
  sqlTable,
  // Numerics
  int, bigint, float, double, decimal,
  // Strings
  varchar, char, text,
  // Date & Time
  date, datetime, time, timestamp,
  // Others
  boolean, enumColumn
} from "@himanshupadecha/corem";

export const comprehensiveTable = sqlTable("comprehensive_table", {
  // Numerics
  id: int("id").primaryKey().autoIncrement(),
  largeId: bigint("large_id"),
  price: decimal("price", { precision: 10, scale: 2 }),
  score: float("score"),
  latitude: double("latitude"),
  
  // Strings
  username: varchar("username", 255).notNull().unique(),
  countryCode: char("country_code", 2),
  bio: text("bio"),
  
  // Date & Time
  birthDate: date("birth_date"),
  appointment: datetime("appointment_time"),
  alarm: time("alarm_time"),
  createdAt: timestamp("created_at").defaultNow(),
  
  // Booleans & Enums
  isActive: boolean("is_active").default(true),
  status: enumColumn("status", ["pending", "active", "suspended", "deleted"]).default("pending")
});`,
          filename: "schema.ts"
        }
      ]
    },
    relationships: {
      title: "Relationships & Foreign Keys",
      description: "Robustly define relations between your tables to ensure database integrity, cascading deletes, and fully typed SQL joins.",
      sections: [
        {
          id: "one-to-many",
          title: "One-to-Many Relationships",
          content: "The most common database relationship. Use the `.references()` method on a column to define a foreign key constraint. Notice how we use an arrow function `() => table.columns.id` to prevent circular dependency issues during initialization.",
          code: `import { sqlTable, int, varchar } from "@himanshupadecha/corem";

export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement(),
  name: varchar("name", 255).notNull(),
});

export const posts = sqlTable("posts", {
  id: int("id").primaryKey().autoIncrement(),
  title: varchar("title", 255).notNull(),
  
  // This creates a foreign key linking to users.id
  authorId: int("author_id")
    .references(() => users.columns.id)
    .notNull(),
});`,
          filename: "schema.ts"
        },
        {
          id: "cascading",
          title: "Cascading Actions",
          content: "You can define what happens to child records when the referenced parent record is updated or deleted using the configuration object inside `.references()`.",
          code: `export const comments = sqlTable("comments", {
  id: int("id").primaryKey().autoIncrement(),
  text: varchar("text", 1000).notNull(),
  
  // If the post is deleted, delete all its comments automatically
  postId: int("post_id")
    .references(() => posts.columns.id, { onDelete: "cascade" })
    .notNull(),
});`,
          filename: "schema.ts"
        },
        {
          id: "many-to-many",
          title: "Many-to-Many Relationships",
          content: "To create a many-to-many relationship, define a junction (or join) table that holds foreign keys referencing both primary tables.",
          code: `export const groups = sqlTable("groups", {
  id: int("id").primaryKey().autoIncrement(),
  name: varchar("name", 255).notNull(),
});

// Junction table connecting users and groups
export const userGroups = sqlTable("user_groups", {
  id: int("id").primaryKey().autoIncrement(),
  
  userId: int("user_id")
    .references(() => users.columns.id, { onDelete: "cascade" })
    .notNull(),
    
  groupId: int("group_id")
    .references(() => groups.columns.id, { onDelete: "cascade" })
    .notNull(),
});`,
          filename: "schema.ts"
        },
        {
          id: "self-referential",
          title: "Self-Referential Relations",
          content: "A table can easily reference itself to represent hierarchical data like nested categories or a manager-employee relationship.",
          code: `export const categories = sqlTable("categories", {
  id: int("id").primaryKey().autoIncrement(),
  name: varchar("name", 255).notNull(),
  
  // References the id of the same table
  parentId: int("parent_id")
    .references(() => categories.columns.id, { onDelete: "cascade" }),
});`,
          filename: "schema.ts"
        }
      ]
    },
    constraints: {
      title: "Constraints",
      description: "Enforce data integrity at the database level using a comprehensive set of column constraints.",
      sections: [
        {
          id: "available-constraints",
          title: "Available Constraints",
          content: "Corem maps seamlessly to native MySQL constraints. The supported constraint types include: `PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `UNSIGNED`, and `CHECK`.",
          code: `import { sqlTable, int, varchar } from "@himanshupadecha/corem";

export const products = sqlTable("products", {
  // AUTO_INCREMENT & PRIMARY KEY
  id: int("id").primaryKey().autoIncrement(),
  
  // NOT NULL & UNIQUE
  sku: varchar("sku", 50).notNull().unique(),
  
  // DEFAULT
  status: varchar("status", 20).default("active"),
  
  // UNSIGNED (Prevents negative numbers)
  stock: int("stock").unsigned().notNull().default(0),
  
  // CHECK (Custom validation rule at the database level)
  price: int("price").check("price > 0").notNull()
});`,
          filename: "schema.ts"
        },
        {
          id: "chaining",
          title: "Chaining Constraints",
          content: "Because Corem uses a fluent API, you can chain multiple constraints together on a single column to build complex validation rules.",
          code: `export const users = sqlTable("users", {
  age: int("age")
    .unsigned()              // Must be positive
    .notNull()               // Cannot be null
    .default(18)             // Defaults to 18
    .check("age >= 18")      // Enforces minimum age in MySQL
});`,
          filename: "schema.ts"
        }
      ]
    },
    select: {
      title: "Select Queries",
      description: "Retrieve data from your database using a powerful, fluent, and 100% type-safe query builder.",
      sections: [
        {
          id: "basic-select",
          title: "1. Default Selection (SELECT *)",
          content: "Calling `.select()` without arguments is equivalent to a `SELECT *` query. It fetches all columns defined in the table schema, and the returned data type perfectly matches your table definition.",
          code: `import { db } from "@/src/db";
import { users } from "@/src/db/schema";

const allUsers = await db.select().from(users).execute();
// Generated SQL: SELECT * FROM users;
// Returns Array<{ id: number; name: string; email: string; createdAt: Date; }>`,
          filename: "queries.ts"
        },
        {
          id: "specific-columns",
          title: "2. Specific Columns (SELECT obj)",
          content: "To fetch only specific columns (and optionally alias them), pass an object to `.select()`. The returned data type will perfectly match the keys and column types of the object you provided.",
          code: `const specificUsers = await db.select({
  userId: users.columns.id,
  username: users.columns.name
}).from(users).execute();

// Generated SQL: SELECT users.id AS userId, users.name AS username FROM users;
// Returns Array<{ userId: number; username: string; }>`,
          filename: "queries.ts"
        },
        {
          id: "complex-query",
          title: "Advanced Querying",
          content: "Corem's query builder shines when handling complex operations. You can seamlessly chain joins, apply compound `where` filters with logical operators like `and()`, specify multiple `orderBy` conditions, and limit your results—all while preserving strict type safety for the selected columns.",
          code: `import { db } from "@/src/db";
import { users, posts } from "@/src/db/schema";
import { eq, and, asc, desc } from "@himanshupadecha/corem";

const dbUsers = await db
  .select({ 
    userId: users.columns.id, 
    username: users.columns.name 
  })
  .from(users)
  .innerJoin(posts, eq(users.columns.id, posts.columns.id))
  .where(
    and(
      eq(users.columns.id, 1), 
      eq(users.columns.name, "first")
    )
  )
  .orderBy(
    desc(users.columns.id), 
    asc(users.columns.name)
  )
  .limit(10)
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT users.id AS userId, users.name AS username 
 * FROM users 
 * INNER JOIN posts ON users.id = posts.id 
 * WHERE users.id = 1 AND users.name = 'first' 
 * ORDER BY users.id DESC, users.name ASC 
 * LIMIT 10;
 */`,
          filename: "complex-queries.ts"
        }
      ]
    },
    insert: {
      title: "Inserting Data",
      description: "Perform fast, type-safe insertion queries. Corem validates your data at compile time, ensuring you never miss a required column or provide the wrong data type.",
      sections: [
        {
          id: "single-insert",
          title: "Inserting a Single Record",
          content: "To insert a row, use the `.insert()` method followed by `.values()`. Because of Corem's strict typing, your IDE will immediately warn you if you forget a column marked as `.notNull()` or try to insert a string into an `.int()` column.",
          code: `import { db } from "@/src/db";
import { users } from "@/src/db/schema";

await db.insert(users).values({
  name: "John Doe",
  email: "john@example.com"
  // createdAt is omitted because it has .defaultNow()
  // id is omitted because it has .autoIncrement()
}).execute();

/*
 * GENERATED SQL:
 * INSERT INTO users (name, email) 
 * VALUES ('John Doe', 'john@example.com');
 */`,
          filename: "insert.ts"
        },
        {
          id: "bulk-insert",
          title: "Bulk Insertions (Coming Soon)",
          content: "Support for bulk inserting arrays of objects in a single, high-performance query is currently on our roadmap. Stay tuned for future updates!",
          code: `// ⚠️ Coming in a future update!
// await db.insert(users).values([
//   { name: "Alice", email: "alice@example.com" },
//   { name: "Bob", email: "bob@example.com" }
// ]).execute();`,
          filename: "future-api.ts"
        }
      ]
    },
    update: {
      title: "Updating Data",
      description: "Safely and efficiently modify existing records. Corem's update queries are type-checked against your schema to prevent invalid data from entering your database.",
      sections: [
        {
          id: "simple-update",
          title: "Basic Update",
          content: "Use the `.update()` method followed by `.set()` to specify the fields to change. Always remember to append a `.where()` clause—otherwise, you might accidentally update every row in the table!",
          code: `import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "@himanshupadecha/corem";

await db.update(users)
  .set({ name: "Updated Name", email: "new@example.com" })
  .where(eq(users.columns.id, 1))
  .execute();

/*
 * GENERATED SQL:
 * UPDATE users 
 * SET name = 'Updated Name', email = 'new@example.com' 
 * WHERE users.id = 1;
 */`,
          filename: "update.ts"
        },
        {
          id: "advanced-update",
          title: "Advanced Conditional Updates",
          content: "You can apply the exact same complex logical operators used in Select queries to precisely target rows for an update.",
          code: `import { and, eq } from "@himanshupadecha/corem";

await db.update(users)
  .set({ status: "active" })
  .where(
    and(
      eq(users.columns.status, "pending"),
      eq(users.columns.email, "test@example.com")
    )
  )
  .execute();
  
/*
 * GENERATED SQL:
 * UPDATE users 
 * SET status = 'active' 
 * WHERE users.status = 'pending' AND users.email = 'test@example.com';
 */`,
          filename: "complex-update.ts"
        },
        {
          id: "returning-data",
          title: "Returning Updated Data",
          content: "By default, calling `.execute()` on an update query returns `null`. If you want to receive the updated record(s) back after the operation completes, you must chain the `.returning()` method before executing.",
          code: `// Without .returning() -> Returns null
const result = await db.update(users)
  .set({ status: "active" })
  .where(eq(users.columns.id, 1))
  .execute();

// With .returning() -> Returns the updated record(s)
const updatedUser = await db.update(users)
  .set({ status: "active" })
  .where(eq(users.columns.id, 1))
  .returning()
  .execute();`,
          filename: "returning.ts"
        }
      ]
    },
    delete: {
      title: "Deleting Data",
      description: "Securely remove records from your database. Corem ensures that your delete operations are fully typed and safely executed.",
      sections: [
        {
          id: "simple-delete",
          title: "Basic Delete",
          content: "Use the `.delete()` method followed by `.from()` to specify the table. Just like with updates, it is crucial to chain a `.where()` clause to prevent wiping out your entire table!",
          code: `import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "@himanshupadecha/corem";

await db.delete()
  .from(users)
  .where(eq(users.columns.id, 10))
  .execute();

/*
 * GENERATED SQL:
 * DELETE FROM users 
 * WHERE users.id = 10;
 */`,
          filename: "delete.ts"
        },
        {
          id: "advanced-delete",
          title: "Advanced Conditional Deletes",
          content: "Combine logical operators to safely target precise records for deletion, ensuring you only remove what you intend to.",
          code: `import { and, eq } from "@himanshupadecha/corem";

await db.delete()
  .from(users)
  .where(
    and(
      eq(users.columns.status, "deleted"),
      eq(users.columns.isActive, false)
    )
  )
  .execute();
  
/*
 * GENERATED SQL:
 * DELETE FROM users 
 * WHERE users.status = 'deleted' AND users.is_active = false;
 */`,
          filename: "complex-delete.ts"
        },
        {
          id: "returning-data",
          title: "Returning Deleted Data",
          content: "By default, calling `.execute()` on a delete query returns `null`. If you need to inspect the data that was just deleted, chain the `.returning()` method before executing.",
          code: `// Without .returning() -> Returns null
const result = await db.delete()
  .from(users)
  .where(eq(users.columns.id, 10))
  .execute();

// With .returning() -> Returns the deleted record(s)
const deletedUser = await db.delete()
  .from(users)
  .where(eq(users.columns.id, 10))
  .returning()
  .execute();`,
          filename: "returning.ts"
        }
      ]
    },
    joins: {
      title: "Joins & Relationships",
      description: "Seamlessly query across multiple tables with fully typed join operations. Corem supports INNER, LEFT, and RIGHT joins, automatically inferring the shape of the combined result set.",
      sections: [
        {
          id: "inner-join",
          title: "Inner Join",
          content: "Use `.innerJoin(table, condition)` to return only the records that have matching values in both tables. If a user doesn't have any posts, they won't appear in this result.",
          code: `import { db } from "@/src/db";
import { users, posts } from "@/src/db/schema";
import { eq } from "@himanshupadecha/corem";

const result = await db
  .select()
  .from(users)
  .innerJoin(posts, eq(users.columns.id, posts.columns.userId))
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * INNER JOIN posts ON users.id = posts.user_id;
 */`,
          filename: "inner-join.ts"
        },
        {
          id: "left-join",
          title: "Left Join",
          content: "Use `.leftJoin(table, condition)` to return all records from the left table (users), and the matched records from the right table (posts). If there is no match, the result is NULL from the right side.",
          code: `const result = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.columns.id, posts.columns.userId))
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * LEFT JOIN posts ON users.id = posts.user_id;
 */`,
          filename: "left-join.ts"
        },
        {
          id: "right-join",
          title: "Right Join",
          content: "Use `.rightJoin(table, condition)` to return all records from the right table, and the matched records from the left table. While less common, Corem fully supports it.",
          code: `const result = await db
  .select()
  .from(users)
  .rightJoin(posts, eq(users.columns.id, posts.columns.userId))
  .execute();
  
/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * RIGHT JOIN posts ON users.id = posts.user_id;
 */`,
          filename: "right-join.ts"
        }
      ]
    },
    filters: {
      title: "Filters & Operators",
      description: "Refine your queries using Corem's comprehensive set of strictly typed logical and comparison operators.",
      sections: [
        {
          id: "comparison-operators",
          title: "Comparison Operators",
          content: "Corem provides functions for all standard SQL comparisons. These functions take a column as the first argument, and the value to compare against as the second argument.",
          code: `import { eq, ne, gt, gte, lt, lte, like, In } from "@himanshupadecha/corem";

// Equals (=)
eq(users.columns.id, 1)

// Not Equals (!=)
ne(users.columns.status, "banned")

// Greater Than (>) & Greater Than or Equal (>=)
gt(users.columns.age, 18)
gte(users.columns.score, 100)

// Less Than (<) & Less Than or Equal (<=)
lt(users.columns.price, 50)
lte(users.columns.stock, 10)

// Pattern Matching (LIKE)
like(users.columns.name, "%Doe%")

// IN Clause
In(users.columns.role, ["admin", "editor"])`,
          filename: "comparisons.ts"
        },
        {
          id: "logical-operators",
          title: "Logical Operators",
          content: "You can combine multiple comparison conditions together using the `and()` and `or()` logical operators. These accept an infinite number of condition arguments.",
          code: `import { and, or, eq, gt } from "@himanshupadecha/corem";

const result = await db.select().from(users).where(
  or(
    // Condition 1: Active AND Age > 18
    and(
      eq(users.columns.isActive, true),
      gt(users.columns.age, 18)
    ),
    // Condition 2: Is Admin
    eq(users.columns.role, "admin")
  )
).execute();

/*
 * GENERATED SQL:
 * SELECT * FROM users 
 * WHERE (users.is_active = true AND users.age > 18) 
 *    OR (users.role = 'admin');
 */`,
          filename: "logical.ts"
        },
        {
          id: "ordering",
          title: "Ordering Results",
          content: "Use the `asc()` and `desc()` functions to specify the sort direction in an `.orderBy()` clause.",
          code: `import { asc, desc } from "@himanshupadecha/corem";

await db.select()
  .from(users)
  .orderBy(
    desc(users.columns.createdAt), // Newest first
    asc(users.columns.name)        // Then alphabetical
  )
  .execute();`,
          filename: "ordering.ts"
        }
      ]
    },
    migrations: {
      title: "Migrations & Schema Sync",
      description: "Keep your database instantly in sync with your TypeScript schema using Corem's zero-config migration CLI.",
      sections: [
        {
          id: "workflow",
          title: "The Push Workflow",
          content: "Corem makes migrations incredibly simple. Whenever you add, remove, or modify a table in your `schema.ts` file, you don't need to write complex migration files manually. Just make the change in TypeScript...",
          code: `// 1. You add a new column to your existing schema
export const users = sqlTable("users", {
  id: int("id").primaryKey().autoIncrement(),
  name: varchar("name", 255).notNull(),
  
  // -> Newly added column!
  bio: varchar("bio", 500) 
});`,
          filename: "schema.ts"
        },
        {
          id: "push",
          title: "Pushing to the Database",
          content: "...and then run the `push` command in your terminal! Corem will automatically calculate the differences and execute the necessary commands. **It migrates tables, columns, and constraints—everything with just one single command.**",
          code: `npx corem push`,
          language: "bash",
          filename: "terminal"
        }
      ]
    },
      cli: {
          title: "CLI Reference",
          description: "Command line interface documentation for Corem toolbelt.",
          sections: [
            {
              id: "usage",
              title: "Basic Commands",
              content: "The Corem CLI is your companion for schema management and database inspection.",
              code: `npx corem push   # Sync schema to DB
npx corem --help # List all commands`,
              language: "bash",
              filename: "terminal"
            }
          ]
      },
      transactions: {
        title: "Transactions (Coming Soon)",
        description: "Robust database transactions for ensuring data consistency are currently under development.",
        sections: [
          {
            id: "tx-roadmap",
            title: "Roadmap: Transactions",
            content: "We are actively working on bringing fully typed, nested, and atomic database transactions to Corem in the very next major version. Stay tuned!",
            code: `// ⚠️ Sneak peek at future API
// await db.transaction(async (tx) => {
//   await tx.insert(users).values({ name: "New User" }).execute();
//   await tx.insert(posts).values({ title: "First Post", userId: 1 }).execute();
// });`,
            filename: "future-api.ts"
          }
        ]
      },
      "raw-sql": {
        title: "Raw SQL (Coming Soon)",
        description: "Arbitrary SQL execution escapes are being implemented for edge-case queries.",
        sections: [
          {
            id: "sql-roadmap",
            title: "Roadmap: Raw SQL Execution",
            content: "Sometimes you just need to write raw SQL. We are building a secure `sql` template literal tag that will seamlessly integrate with the query builder in our next version.",
            code: `// ⚠️ Sneak peek at future API
// import { sql } from "@himanshupadecha/corem";
// const result = await db.execute(sql\`SELECT * FROM users WHERE id = \${1}\`);`,
            filename: "future-api.ts"
          }
        ]
      },
      "api-reference": {
        title: "API Reference",
        description: "Detailed documentation for the Corem API surface.",
        sections: [
          {
            id: "api",
            title: "Full API List",
            content: "Refer to the generated types and exported modules for a complete view of the API. Corem is built to be intuitive and 100% type-safe.",
            callout: {
              type: "info",
              title: "Notice",
              text: "Our API is strictly following standard SQL conventions to reduce your learning curve."
            }
          }
        ]
      }
  };

  return docs[slug];
}
