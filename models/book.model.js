
// const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
// const { sql } = require("drizzle-orm");
// const authorTable = require("./author.model"); // Ensure this path is correct
// const { serial } = require("drizzle-orm/mysql-core");

// const booksTable = pgTable("booksLibrary", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     title: varchar({ length: 255 }).notNull(),
//     description: text().notNull(),
//     authorId: uuid('authorId').references(() => authorTable.id).notNull(), 
// }, (table)=> ([
//      index('title_index').using('gin', sql`to_tsvector('english', ${table.title})`),
//   ] 
// ));
// module.exports = booksTable;




const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");
const authorTable = require("./author.model");

const booksTable = pgTable("booksLibrary", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  authorId: uuid("authorId").references(() => authorTable.id).notNull(),
}, (table) => [
  index("title_index").using("gin", sql`to_tsvector('english', ${table.title})`),
]);

module.exports = booksTable;

 
  

