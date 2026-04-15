import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context.js";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please login (10001)",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have required permission (10002)",
    });
  }
  return next({ ctx });
});

// Import routers
import { authRouter } from "./routers/auth.js";
import { subscriptionRouter } from "./routers/subscription.js";
import { analyticsRouter } from "./routers/analytics.js";

export const appRouter = router({
  auth: authRouter,
  subscription: subscriptionRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
