import { router, publicProcedure, protectedProcedure } from "../trpc.js";
import { z } from "zod";

export const authRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  logout: publicProcedure.mutation(() => {
    return { success: true };
  }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      // This is a placeholder - actual OAuth would be handled by Manus platform
      return {
        id: "user-123",
        email: input.email,
        name: "Test User",
        role: "user" as const,
      };
    }),
});
