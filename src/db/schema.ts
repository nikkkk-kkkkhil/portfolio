import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Signals — messages transmitted through the contact form ("TRANSMIT A SIGNAL").
 * Stored server-side in PostgreSQL. No secrets live in client code.
 */
export const signals = pgTable("signals", {
  id: serial("id").primaryKey(),
  callsign: text("callsign").notNull(),
  frequency: text("frequency"), // email — optional
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
