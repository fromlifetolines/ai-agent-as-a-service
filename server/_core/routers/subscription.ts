import { router, publicProcedure, protectedProcedure, adminProcedure } from "../trpc.js";
import { z } from "zod";
import { nanoid } from "nanoid";

// Mock data for demonstration
const mockPlans: any[] = [
  {
    id: "plan-1",
    name: "基礎版",
    description: "適合初期試用",
    price: "2990",
    currency: "TWD",
    billingCycle: "monthly",
    conversationLimit: 1000,
    knowledgeBaseLimit: 1,
    features: ["1,000 次對話/月", "1 個知識庫", "基礎分析", "郵件支援", "LINE 整合"],
    isActive: true,
    displayOrder: 0,
  },
  {
    id: "plan-2",
    name: "專業版",
    description: "推薦方案",
    price: "5990",
    currency: "TWD",
    billingCycle: "monthly",
    conversationLimit: 10000,
    knowledgeBaseLimit: 3,
    features: ["10,000 次對話/月", "3 個知識庫", "進階分析 + CRM", "優先郵件支援", "自訂工作流", "多渠道整合"],
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "plan-3",
    name: "企業版",
    description: "完整解決方案",
    price: "12990",
    currency: "TWD",
    billingCycle: "monthly",
    conversationLimit: -1, // unlimited
    knowledgeBaseLimit: -1, // unlimited
    features: ["無限對話", "無限知識庫", "完整分析", "24/7 電話支援", "優先功能開發", "專屬帳戶經理"],
    isActive: true,
    displayOrder: 2,
  },
];

export const subscriptionRouter = router({
  // Get all active subscription plans
  getAllPlans: publicProcedure.query(async () => {
    return mockPlans.filter((plan) => plan.isActive);
  }),

  // Get single plan
  getPlan: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return mockPlans.find((plan) => plan.id === input.id);
    }),

  // Create new subscription plan (admin only)
  createPlan: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.string(),
        currency: z.string().default("TWD"),
        billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
        conversationLimit: z.number().optional(),
        knowledgeBaseLimit: z.number().optional(),
        features: z.array(z.string()).optional(),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const newPlan = {
        id: nanoid(),
        ...input,
        isActive: true,
      };
      mockPlans.push(newPlan);
      return newPlan;
    }),

  // Update subscription plan (admin only)
  updatePlan: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        currency: z.string().optional(),
        billingCycle: z.enum(["monthly", "yearly"]).optional(),
        conversationLimit: z.number().optional(),
        knowledgeBaseLimit: z.number().optional(),
        features: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const index = mockPlans.findIndex((plan) => plan.id === input.id);
      if (index === -1) throw new Error("Plan not found");

      const updatedPlan = { ...mockPlans[index], ...input };
      mockPlans[index] = updatedPlan;
      return updatedPlan;
    }),

  // Delete subscription plan (admin only)
  deletePlan: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const index = mockPlans.findIndex((plan) => plan.id === input.id);
      if (index === -1) throw new Error("Plan not found");

      mockPlans.splice(index, 1);
      return { success: true };
    }),

  // Get user's current subscription
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    // Mock: return a subscription for the user
    return {
      id: "sub-123",
      userId: ctx.user.id,
      planId: "plan-2",
      status: "active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      autoRenew: true,
    };
  }),
});
