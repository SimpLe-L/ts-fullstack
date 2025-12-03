import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	createAt: timestamp().notNull().defaultNow(),
	updateAt: timestamp().notNull().defaultNow(),
};
