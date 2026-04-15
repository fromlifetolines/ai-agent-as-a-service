import { db } from "./db-client.js";
import type { Database } from "./db-client.js";
import { users, subscriptionPlans, customerSubscriptions, analyticsData, notifications, knowledgeBases } from "../drizzle/schema.js";
import { eq, and, gte, lte, desc, count } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * Subscription Plans Queries
 */
export const subscriptionQueries = {
  // Get all active subscription plans
  getAllPlans: async () => {
    return await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.isActive, true))
      .orderBy(subscriptionPlans.displayOrder);
  },

  // Get plan by ID
  getPlanById: async (planId: string) => {
    return await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, planId))
      .limit(1);
  },

  // Create new plan
  createPlan: async (data: {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    billingCycle?: "monthly" | "yearly";
    conversationLimit?: number;
    knowledgeBaseLimit?: number;
    features?: string;
    displayOrder?: number;
  }) => {
    const id = nanoid();
    await db.insert(subscriptionPlans).values({
      id,
      ...data,
      price: data.price.toString(),
    });
    return { id };
  },

  // Update plan
  updatePlan: async (
    planId: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      currency?: string;
      billingCycle?: "monthly" | "yearly";
      conversationLimit?: number;
      knowledgeBaseLimit?: number;
      features?: string;
      isActive?: boolean;
      displayOrder?: number;
    }
  ) => {
    const updateData: any = { ...data };
    if (data.price !== undefined) {
      updateData.price = data.price.toString();
    }
    await db
      .update(subscriptionPlans)
      .set(updateData)
      .where(eq(subscriptionPlans.id, planId));
  },

  // Delete plan (soft delete)
  deletePlan: async (planId: string) => {
    await db
      .update(subscriptionPlans)
      .set({ isActive: false })
      .where(eq(subscriptionPlans.id, planId));
  },
};

/**
 * Customer Subscriptions Queries
 */
export const customerSubscriptionQueries = {
  // Get user's active subscription
  getUserActiveSubscription: async (userId: string) => {
    return await db
      .select()
      .from(customerSubscriptions)
      .where(
        and(
          eq(customerSubscriptions.userId, userId),
          eq(customerSubscriptions.status, "active")
        )
      )
      .limit(1);
  },

  // Get all user subscriptions
  getUserSubscriptions: async (userId: string) => {
    return await db
      .select()
      .from(customerSubscriptions)
      .where(eq(customerSubscriptions.userId, userId));
  },

  // Create subscription
  createSubscription: async (data: {
    userId: string;
    planId: string;
    startDate?: Date;
    endDate?: Date;
    autoRenew?: boolean;
  }) => {
    const id = nanoid();
    await db.insert(customerSubscriptions).values({
      id,
      ...data,
    });
    return { id };
  },

  // Update subscription status
  updateSubscriptionStatus: async (
    subscriptionId: string,
    status: "active" | "paused" | "cancelled" | "expired"
  ) => {
    await db
      .update(customerSubscriptions)
      .set({ status })
      .where(eq(customerSubscriptions.id, subscriptionId));
  },
};

/**
 * Analytics Queries
 */
export const analyticsQueries = {
  // Get analytics for a user in date range
  getAnalyticsByDateRange: async (
    userId: string,
    startDate: Date,
    endDate: Date
  ) => {
    return await db
      .select()
      .from(analyticsData)
      .where(
        and(
          eq(analyticsData.userId, userId),
          gte(analyticsData.date, startDate),
          lte(analyticsData.date, endDate)
        )
      )
      .orderBy(desc(analyticsData.date));
  },

  // Get total conversations for user
  getTotalConversations: async (userId: string) => {
    const result = await db
      .select({ total: count() })
      .from(analyticsData)
      .where(eq(analyticsData.userId, userId));
    return result[0]?.total || 0;
  },

  // Create analytics record
  createAnalyticsRecord: async (data: {
    userId: string;
    conversationCount: number;
    conversionRate: number;
    avgResponseTime: number;
    satisfaction: number;
  }) => {
    const id = nanoid();
    await db.insert(analyticsData).values({
      id,
      userId: data.userId,
      conversationCount: data.conversationCount,
      conversionRate: data.conversionRate.toString(),
      avgResponseTime: data.avgResponseTime.toString(),
      satisfaction: data.satisfaction.toString(),
    });
    return { id };
  },
};

/**
 * Notifications Queries
 */
export const notificationQueries = {
  // Get user notifications
  getUserNotifications: async (userId: string, limit = 50, offset = 0) => {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);
  },

  // Get unread notification count
  getUnreadCount: async (userId: string) => {
    const result = await db
      .select({ count: count() })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, userId),
          eq(notifications.isRead, false)
        )
      );
    return result[0]?.count || 0;
  },

  // Create notification
  createNotification: async (data: {
    userId: string;
    type: string;
    title: string;
    content?: string;
  }) => {
    const id = nanoid();
    await db.insert(notifications).values({
      id,
      ...data,
    });
    return { id };
  },

  // Mark as read
  markAsRead: async (notificationId: string) => {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, notificationId));
  },

  // Mark all as read
  markAllAsRead: async (userId: string) => {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId));
  },
};

/**
 * Revenue Queries
 */
export const revenueQueries = {
  // Get monthly revenue
  getMonthlyRevenue: async (year: number, month: number, userId?: string) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const subscriptions = await db
      .select()
      .from(customerSubscriptions)
      .where(
        and(
          gte(customerSubscriptions.startDate, startDate),
          lte(customerSubscriptions.startDate, endDate),
          userId ? eq(customerSubscriptions.userId, userId) : undefined
        )
      );

    return subscriptions;
  },

  // Get total revenue for period
  getTotalRevenuePeriod: async (
    startDate: Date,
    endDate: Date,
    userId?: string
  ) => {
    const subscriptions = await db
      .select()
      .from(customerSubscriptions)
      .where(
        and(
          gte(customerSubscriptions.startDate, startDate),
          lte(customerSubscriptions.startDate, endDate),
          userId ? eq(customerSubscriptions.userId, userId) : undefined
        )
      );

    return subscriptions;
  },

  // Get customer count by plan
  getCustomerCountByPlan: async (planId: string) => {
    const result = await db
      .select({ count: count() })
      .from(customerSubscriptions)
      .where(
        and(
          eq(customerSubscriptions.planId, planId),
          eq(customerSubscriptions.status, "active")
        )
      );
    return result[0]?.count || 0;
  },

  // Get total active customers
  getTotalActiveCustomers: async () => {
    const result = await db
      .select({ count: count() })
      .from(customerSubscriptions)
      .where(eq(customerSubscriptions.status, "active"));
    return result[0]?.count || 0;
  },

  // Get churn rate for period
  getChurnRate: async (startDate: Date, endDate: Date) => {
    const churned = await db
      .select({ count: count() })
      .from(customerSubscriptions)
      .where(
        and(
          gte(customerSubscriptions.updatedAt, startDate),
          lte(customerSubscriptions.updatedAt, endDate),
          eq(customerSubscriptions.status, "cancelled")
        )
      );

    const total = await db
      .select({ count: count() })
      .from(customerSubscriptions)
      .where(eq(customerSubscriptions.status, "active"));

    return total[0]?.count > 0
      ? ((churned[0]?.count || 0) / total[0]?.count) * 100
      : 0;
  },
};

/**
 * Knowledge Base Queries
 */
export const knowledgeBaseQueries = {
  // Get user's knowledge bases
  getUserKnowledgeBases: async (userId: string) => {
    return await db
      .select()
      .from(knowledgeBases)
      .where(eq(knowledgeBases.userId, userId));
  },

  // Get knowledge base by ID
  getKnowledgeBaseById: async (kbId: string) => {
    return await db
      .select()
      .from(knowledgeBases)
      .where(eq(knowledgeBases.id, kbId))
      .limit(1);
  },

  // Create knowledge base
  createKnowledgeBase: async (data: {
    userId: string;
    name: string;
    description?: string;
    content?: string;
    industry?: string;
  }) => {
    const id = nanoid();
    await db.insert(knowledgeBases).values({
      id,
      ...data,
    });
    return { id };
  },

  // Update knowledge base
  updateKnowledgeBase: async (
    kbId: string,
    data: {
      name?: string;
      description?: string;
      content?: string;
      industry?: string;
      isActive?: boolean;
    }
  ) => {
    await db
      .update(knowledgeBases)
      .set(data)
      .where(eq(knowledgeBases.id, kbId));
  },

  // Delete knowledge base
  deleteKnowledgeBase: async (kbId: string) => {
    await db
      .update(knowledgeBases)
      .set({ isActive: false })
      .where(eq(knowledgeBases.id, kbId));
  },
};
