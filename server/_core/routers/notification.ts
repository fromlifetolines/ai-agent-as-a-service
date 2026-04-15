import { router, protectedProcedure, adminProcedure } from "../trpc.js";
import { z } from "zod";
import { nanoid } from "nanoid";

// Mock notifications storage
const mockNotifications: any[] = [];

export const notificationRouter = router({
  // Get user's notifications
  getNotifications: protectedProcedure
    .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const userNotifications = mockNotifications
        .filter((n) => n.userId === ctx.user.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(input.offset, input.offset + input.limit);

      return {
        notifications: userNotifications,
        total: mockNotifications.filter((n) => n.userId === ctx.user.id).length,
      };
    }),

  // Mark notification as read
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const notification = mockNotifications.find((n) => n.id === input.id && n.userId === ctx.user.id);
      if (!notification) throw new Error("Notification not found");

      notification.isRead = true;
      return notification;
    }),

  // Send subscription confirmation email
  sendSubscriptionConfirmation: protectedProcedure
    .input(
      z.object({
        planName: z.string(),
        price: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const notification = {
        id: nanoid(),
        userId: ctx.user.id,
        type: "subscription_confirmation",
        title: `訂閱確認：${input.planName}`,
        content: `您已成功訂閱 ${input.planName}，價格為 NT$${input.price}/月。服務將於 ${input.startDate.toLocaleDateString("zh-TW")} 開始，至 ${input.endDate.toLocaleDateString("zh-TW")} 結束。`,
        isRead: false,
        createdAt: new Date(),
      };

      mockNotifications.push(notification);

      // In production, this would send an actual email via SendGrid, AWS SES, or similar
      console.log(`[EMAIL] Subscription confirmation sent to ${ctx.user.email}`);

      return {
        success: true,
        notificationId: notification.id,
        message: "訂閱確認郵件已發送",
      };
    }),

  // Send renewal reminder email
  sendRenewalReminder: protectedProcedure
    .input(
      z.object({
        planName: z.string(),
        renewalDate: z.date(),
        price: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const notification = {
        id: nanoid(),
        userId: ctx.user.id,
        type: "renewal_reminder",
        title: `訂閱續約提醒：${input.planName}`,
        content: `您的 ${input.planName} 訂閱將於 ${input.renewalDate.toLocaleDateString("zh-TW")} 到期。如需繼續使用服務，請確保帳戶中有足夠的餘額。續約價格為 NT$${input.price}/月。`,
        isRead: false,
        createdAt: new Date(),
      };

      mockNotifications.push(notification);

      console.log(`[EMAIL] Renewal reminder sent to ${ctx.user.email}`);

      return {
        success: true,
        notificationId: notification.id,
        message: "續約提醒郵件已發送",
      };
    }),

  // Send expiry warning email
  sendExpiryWarning: protectedProcedure
    .input(
      z.object({
        planName: z.string(),
        expiryDate: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const notification = {
        id: nanoid(),
        userId: ctx.user.id,
        type: "expiry_warning",
        title: `訂閱即將到期：${input.planName}`,
        content: `警告：您的 ${input.planName} 訂閱將於 ${input.expiryDate.toLocaleDateString("zh-TW")} 到期。服務到期後將無法使用。請立即續約以保持服務連續性。`,
        isRead: false,
        createdAt: new Date(),
      };

      mockNotifications.push(notification);

      console.log(`[EMAIL] Expiry warning sent to ${ctx.user.email}`);

      return {
        success: true,
        notificationId: notification.id,
        message: "到期警告郵件已發送",
      };
    }),

  // Send upgrade/downgrade notification
  sendPlanChangeNotification: protectedProcedure
    .input(
      z.object({
        oldPlanName: z.string(),
        newPlanName: z.string(),
        changeType: z.enum(["upgrade", "downgrade"]),
        effectiveDate: z.date(),
        priceDifference: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const title =
        input.changeType === "upgrade"
          ? `方案升級：${input.oldPlanName} → ${input.newPlanName}`
          : `方案降級：${input.oldPlanName} → ${input.newPlanName}`;

      const content =
        input.changeType === "upgrade"
          ? `恭喜！您已成功升級至 ${input.newPlanName}。新方案將於 ${input.effectiveDate.toLocaleDateString("zh-TW")} 生效。${input.priceDifference ? `差價調整：${input.priceDifference}` : ""}`
          : `您的方案已降級至 ${input.newPlanName}。新方案將於 ${input.effectiveDate.toLocaleDateString("zh-TW")} 生效。${input.priceDifference ? `退款金額：${input.priceDifference}` : ""}`;

      const notification = {
        id: nanoid(),
        userId: ctx.user.id,
        type: input.changeType === "upgrade" ? "plan_upgrade" : "plan_downgrade",
        title,
        content,
        isRead: false,
        createdAt: new Date(),
      };

      mockNotifications.push(notification);

      console.log(`[EMAIL] Plan change notification sent to ${ctx.user.email}`);

      return {
        success: true,
        notificationId: notification.id,
        message: `方案${input.changeType === "upgrade" ? "升級" : "降級"}通知已發送`,
      };
    }),

  // Send payment failed notification
  sendPaymentFailedNotification: protectedProcedure
    .input(
      z.object({
        planName: z.string(),
        reason: z.string(),
        retryDate: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const notification = {
        id: nanoid(),
        userId: ctx.user.id,
        type: "payment_failed",
        title: `付款失敗：${input.planName}`,
        content: `您的 ${input.planName} 訂閱付款失敗。原因：${input.reason}。系統將於 ${input.retryDate.toLocaleDateString("zh-TW")} 重試付款。請確保您的付款方式有效。`,
        isRead: false,
        createdAt: new Date(),
      };

      mockNotifications.push(notification);

      console.log(`[EMAIL] Payment failed notification sent to ${ctx.user.email}`);

      return {
        success: true,
        notificationId: notification.id,
        message: "付款失敗通知已發送",
      };
    }),

  // Get unread notification count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const unreadCount = mockNotifications.filter((n) => n.userId === ctx.user.id && !n.isRead).length;
    return { unreadCount };
  }),

  // Mark all notifications as read
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    const userNotifications = mockNotifications.filter((n) => n.userId === ctx.user.id);
    userNotifications.forEach((n) => {
      n.isRead = true;
    });
    return { success: true, count: userNotifications.length };
  }),
});
