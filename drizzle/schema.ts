import { mysqlTable, varchar, int, text, timestamp, boolean, decimal, enum as mysqlEnum } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Users table
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Subscription Plans table
export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("TWD"),
  billingCycle: mysqlEnum("billing_cycle", ["monthly", "yearly"]).default("monthly"),
  conversationLimit: int("conversation_limit"),
  knowledgeBaseLimit: int("knowledge_base_limit"),
  features: text("features"), // JSON array stored as text
  isActive: boolean("is_active").default(true),
  displayOrder: int("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Customer Subscriptions table
export const customerSubscriptions = mysqlTable("customer_subscriptions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  planId: varchar("plan_id", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["active", "paused", "cancelled", "expired"]).default("active"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  autoRenew: boolean("auto_renew").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Analytics data table
export const analyticsData = mysqlTable("analytics_data", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  date: timestamp("date").defaultNow(),
  conversationCount: int("conversation_count").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default("0"),
  avgResponseTime: decimal("avg_response_time", { precision: 10, scale: 2 }).default("0"),
  satisfaction: decimal("satisfaction", { precision: 3, scale: 1 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Knowledge Base table
export const knowledgeBases = mysqlTable("knowledge_bases", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"), // JSON content
  industry: varchar("industry", { length: 100 }), // dental, restaurant, salon, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Notifications table
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["subscription_confirmation", "renewal_reminder", "expiry_warning", "payment_failed"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(customerSubscriptions),
  knowledgeBases: many(knowledgeBases),
  analytics: many(analyticsData),
  notifications: many(notifications),
}));

export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
  customerSubscriptions: many(customerSubscriptions),
}));

export const customerSubscriptionsRelations = relations(customerSubscriptions, ({ one }) => ({
  user: one(users, {
    fields: [customerSubscriptions.userId],
    references: [users.id],
  }),
  plan: one(subscriptionPlans, {
    fields: [customerSubscriptions.planId],
    references: [subscriptionPlans.id],
  }),
}));

export const knowledgeBasesRelations = relations(knowledgeBases, ({ one }) => ({
  user: one(users, {
    fields: [knowledgeBases.userId],
    references: [users.id],
  }),
}));

export const analyticsDataRelations = relations(analyticsData, ({ one }) => ({
  user: one(users, {
    fields: [analyticsData.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
