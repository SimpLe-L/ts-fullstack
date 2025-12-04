import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

//#region src/schema/global.ts
const timestamps = {
	createAt: timestamp().notNull().defaultNow(),
	updateAt: timestamp().notNull().defaultNow()
};

//#endregion
//#region src/schema/user.schema.ts
const user = pgTable("user", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).notNull().unique(),
	email: varchar("email", { length: 256 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	...timestamps
});
const UserSelectSchema = createSelectSchema(user);
const UserInsertSchema = createInsertSchema(user);
const UserUpdateSchema = createUpdateSchema(user);

//#endregion
//#region src/schema/index.ts
const schema = { user };

//#endregion
export { UserInsertSchema, UserSelectSchema, UserUpdateSchema, schema, user };