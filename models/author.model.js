const { pgTable, varchar, uuid, integer } = require("drizzle-orm/pg-core");

const authorTable = pgTable("Author", {
    id: uuid().primaryKey().defaultRandom(),
    FirstName: varchar({ length: 100 }).notNull(),
    LastName: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    age: integer().notNull(), 
});
module.exports = authorTable;


