import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./global";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).notNull().unique(),
	email: varchar("email", { length: 256 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	...timestamps,
});

export const UserSelectSchema = createSelectSchema(user);
export type UserSelect = typeof UserSelectSchema
export const UserInsertSchema = createInsertSchema(user);
export type UserInsert = typeof UserInsertSchema;
export const UserUpdateSchema = createUpdateSchema(user);
export type UserUpdate = typeof UserUpdateSchema;
