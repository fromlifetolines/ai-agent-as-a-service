import { router, protectedProcedure, adminProcedure } from "../trpc.js";
import { z } from "zod";

export const revenueRouter = router({
  // Get monthly revenue summary
  getMonthlyRevenue: adminProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().min(1).max(12),
      })
    )
    .query(async ({ input }) => {
      // Mock data - in production, this would query the database
      const mockData = {
        totalRevenue: 125000,
        totalTransactions: 42,
        averageOrderValue: 2976,
        newCustomers: 8,
        churnedCustomers: 2,
        monthlyGrowth: 12.5,
        conversionRate: 8.5,
        topPlans: [
          { name: "專業版", revenue: 75000, customers: 25 },
          { name: "企業版", revenue: 35000, customers: 8 },
          { name: "基礎版", revenue: 15000, customers: 9 },
        ],
      };

      return mockData;
    }),

  // Get revenue trend (last 12 months)
  getRevenueTrend: adminProcedure.query(async () => {
    // Mock data - in production, this would query the database
    const mockTrend = [
      { month: "2025-05", revenue: 45000, transactions: 18, customers: 28 },
      { month: "2025-06", revenue: 52000, transactions: 21, customers: 32 },
      { month: "2025-07", revenue: 58000, transactions: 24, customers: 36 },
      { month: "2025-08", revenue: 62000, transactions: 26, customers: 40 },
      { month: "2025-09", revenue: 68000, transactions: 29, customers: 45 },
      { month: "2025-10", revenue: 75000, transactions: 32, customers: 50 },
      { month: "2025-11", revenue: 85000, transactions: 36, customers: 58 },
      { month: "2025-12", revenue: 95000, transactions: 40, customers: 65 },
      { month: "2026-01", revenue: 105000, transactions: 44, customers: 72 },
      { month: "2026-02", revenue: 110000, transactions: 45, customers: 78 },
      { month: "2026-03", revenue: 115000, transactions: 46, customers: 82 },
      { month: "2026-04", revenue: 125000, transactions: 42, customers: 88 },
    ];

    return mockTrend;
  }),

  // Get customer metrics
  getCustomerMetrics: adminProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().min(1).max(12),
      })
    )
    .query(async ({ input }) => {
      // Mock data
      const mockMetrics = {
        totalCustomers: 88,
        activeCustomers: 82,
        churnRate: 2.3,
        lifetimeValue: 1420,
        acquisitionCost: 350,
        retentionRate: 97.7,
        monthlyActiveUsers: 82,
        newCustomersThisMonth: 8,
        customersByPlan: [
          { plan: "基礎版", count: 9, percentage: 10.2 },
          { plan: "專業版", count: 25, percentage: 28.4 },
          { plan: "企業版", count: 8, percentage: 9.1 },
          { plan: "試用版", count: 46, percentage: 52.3 },
        ],
      };

      return mockMetrics;
    }),

  // Get conversion metrics
  getConversionMetrics: adminProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().min(1).max(12),
      })
    )
    .query(async ({ input }) => {
      // Mock data
      const mockConversion = {
        signupToTrialConversion: 45.2,
        trialToPayingConversion: 18.5,
        overallConversion: 8.5,
        averageTrialDays: 14,
        planUpgradeRate: 12.3,
        planDowngradeRate: 2.1,
        conversionBySource: [
          { source: "Google 廣告", conversion: 12.5, count: 45 },
          { source: "社群媒體", conversion: 8.3, count: 28 },
          { source: "直接訪問", conversion: 6.2, count: 22 },
          { source: "推薦", conversion: 15.8, count: 18 },
          { source: "其他", conversion: 4.1, count: 15 },
        ],
      };

      return mockConversion;
    }),

  // Get MRR (Monthly Recurring Revenue)
  getMRR: adminProcedure.query(async () => {
    // Mock data
    const mockMRR = {
      currentMRR: 125000,
      previousMRR: 111000,
      growth: 12.6,
      mrrByPlan: [
        { plan: "基礎版", mrr: 15000, customers: 9 },
        { plan: "專業版", mrr: 75000, customers: 25 },
        { plan: "企業版", mrr: 35000, customers: 8 },
      ],
      mrrTrend: [
        { month: "2026-01", mrr: 105000 },
        { month: "2026-02", mrr: 110000 },
        { month: "2026-03", mrr: 115000 },
        { month: "2026-04", mrr: 125000 },
      ],
    };

    return mockMRR;
  }),

  // Get ARR (Annual Recurring Revenue)
  getARR: adminProcedure.query(async () => {
    // Mock data
    const mockARR = {
      currentARR: 1500000,
      previousARR: 1332000,
      growth: 12.6,
      arrByPlan: [
        { plan: "基礎版", arr: 180000, customers: 9 },
        { plan: "專業版", arr: 900000, customers: 25 },
        { plan: "企業版", arr: 420000, customers: 8 },
      ],
    };

    return mockARR;
  }),

  // Get cohort analysis
  getCohortAnalysis: adminProcedure
    .input(
      z.object({
        cohortType: z.enum(["monthly", "quarterly"]).default("monthly"),
      })
    )
    .query(async ({ input }) => {
      // Mock cohort data
      const mockCohort = [
        {
          cohort: "2025-05",
          month0: 28,
          month1: 26,
          month2: 25,
          month3: 24,
          month4: 23,
          month5: 22,
          month6: 21,
          month7: 20,
          month8: 19,
          month9: 18,
          month10: 17,
          month11: 16,
        },
        {
          cohort: "2025-06",
          month0: 32,
          month1: 30,
          month2: 29,
          month3: 28,
          month4: 27,
          month5: 26,
          month6: 25,
          month7: 24,
          month8: 23,
          month9: 22,
          month10: 21,
        },
        {
          cohort: "2025-07",
          month0: 36,
          month1: 34,
          month2: 33,
          month3: 32,
          month4: 31,
          month5: 30,
          month6: 29,
          month7: 28,
          month8: 27,
          month9: 26,
        },
        {
          cohort: "2025-08",
          month0: 40,
          month1: 38,
          month2: 37,
          month3: 36,
          month4: 35,
          month5: 34,
          month6: 33,
          month7: 32,
          month8: 31,
        },
        {
          cohort: "2025-09",
          month0: 45,
          month1: 43,
          month2: 42,
          month3: 41,
          month4: 40,
          month5: 39,
          month6: 38,
          month7: 37,
        },
        {
          cohort: "2025-10",
          month0: 50,
          month1: 48,
          month2: 47,
          month3: 46,
          month4: 45,
          month5: 44,
          month6: 43,
        },
        {
          cohort: "2025-11",
          month0: 58,
          month1: 56,
          month2: 55,
          month3: 54,
          month4: 53,
          month5: 52,
        },
        {
          cohort: "2025-12",
          month0: 65,
          month1: 63,
          month2: 62,
          month3: 61,
          month4: 60,
        },
        {
          cohort: "2026-01",
          month0: 72,
          month1: 70,
          month2: 69,
          month3: 68,
        },
        {
          cohort: "2026-02",
          month0: 78,
          month1: 76,
          month2: 75,
        },
        {
          cohort: "2026-03",
          month0: 82,
          month1: 80,
        },
        {
          cohort: "2026-04",
          month0: 88,
        },
      ];

      return mockCohort;
    }),
});
