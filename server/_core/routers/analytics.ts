import { router, protectedProcedure } from "../trpc.js";
import { z } from "zod";

export const analyticsRouter = router({
  // Get analytics data for a specific time range
  getAnalytics: protectedProcedure
    .input(
      z.object({
        timeRange: z.enum(["week", "month", "quarter", "year"]).default("month"),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      // Mock analytics data
      const mockData = {
        week: {
          conversationTrend: [
            { date: "4/9", conversations: 280 },
            { date: "4/10", conversations: 320 },
            { date: "4/11", conversations: 290 },
            { date: "4/12", conversations: 380 },
            { date: "4/13", conversations: 420 },
            { date: "4/14", conversations: 350 },
            { date: "4/15", conversations: 480 },
          ],
          conversionRateTrend: [
            { date: "4/9", rate: 88 },
            { date: "4/10", rate: 90 },
            { date: "4/11", rate: 87 },
            { date: "4/12", rate: 92 },
            { date: "4/13", rate: 94 },
            { date: "4/14", rate: 91 },
            { date: "4/15", rate: 96 },
          ],
          topQuestions: [
            { question: "營業時間是幾點？", count: 287 },
            { question: "如何預約服務？", count: 245 },
            { question: "有停車位嗎？", count: 198 },
            { question: "支援線上支付嗎？", count: 156 },
          ],
          stats: {
            totalConversations: 2847,
            conversionRate: 94.2,
            avgResponseTime: "0.8s",
            satisfaction: 4.8,
            monthlyChange: "↑ 12%",
          },
        },
        month: {
          conversationTrend: [
            { date: "4/1", conversations: 2100 },
            { date: "4/8", conversations: 2400 },
            { date: "4/15", conversations: 2847 },
          ],
          conversionRateTrend: [
            { date: "4/1", rate: 88 },
            { date: "4/8", rate: 91 },
            { date: "4/15", rate: 94.2 },
          ],
          topQuestions: [
            { question: "營業時間是幾點？", count: 287 },
            { question: "如何預約服務？", count: 245 },
            { question: "有停車位嗎？", count: 198 },
            { question: "支援線上支付嗎？", count: 156 },
          ],
          stats: {
            totalConversations: 2847,
            conversionRate: 94.2,
            avgResponseTime: "0.8s",
            satisfaction: 4.8,
            monthlyChange: "↑ 12%",
          },
        },
        quarter: {
          conversationTrend: [
            { date: "1月", conversations: 5200 },
            { date: "2月", conversations: 6100 },
            { date: "3月", conversations: 7400 },
            { date: "4月", conversations: 8500 },
          ],
          conversionRateTrend: [
            { date: "1月", rate: 85 },
            { date: "2月", rate: 88 },
            { date: "3月", rate: 91 },
            { date: "4月", rate: 94.2 },
          ],
          topQuestions: [
            { question: "營業時間是幾點？", count: 1200 },
            { question: "如何預約服務？", count: 980 },
            { question: "有停車位嗎？", count: 750 },
            { question: "支援線上支付嗎？", count: 620 },
          ],
          stats: {
            totalConversations: 27200,
            conversionRate: 94.2,
            avgResponseTime: "0.75s",
            satisfaction: 4.7,
            monthlyChange: "↑ 35%",
          },
        },
        year: {
          conversationTrend: [
            { date: "2025年", conversations: 45000 },
            { date: "2026年Q1", conversations: 28700 },
            { date: "2026年Q2", conversations: 32100 },
          ],
          conversionRateTrend: [
            { date: "2025年", rate: 82 },
            { date: "2026年Q1", rate: 89 },
            { date: "2026年Q2", rate: 94.2 },
          ],
          topQuestions: [
            { question: "營業時間是幾點？", count: 5200 },
            { question: "如何預約服務？", count: 4100 },
            { question: "有停車位嗎？", count: 3200 },
            { question: "支援線上支付嗎？", count: 2800 },
          ],
          stats: {
            totalConversations: 105800,
            conversionRate: 94.2,
            avgResponseTime: "0.72s",
            satisfaction: 4.6,
            monthlyChange: "↑ 85%",
          },
        },
      };

      return mockData[input.timeRange];
    }),

  // Get conversation trends
  getConversationTrends: protectedProcedure
    .input(z.object({ timeRange: z.enum(["week", "month", "quarter", "year"]) }))
    .query(async ({ input, ctx }) => {
      // Return mock trend data based on time range
      return [];
    }),

  // Get top questions
  getTopQuestions: protectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input, ctx }) => {
      // Return mock top questions
      return [];
    }),
});
