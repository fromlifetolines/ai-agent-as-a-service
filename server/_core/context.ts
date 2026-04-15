import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { verifyAuth } from "./oauth.js";

export interface Context {
  user?: {
    id: string;
    email: string;
    name?: string;
    role: "admin" | "user";
  };
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<Context> {
  const authHeader = opts.req.headers.authorization;
  
  if (!authHeader) {
    return {};
  }

  try {
    const user = await verifyAuth(authHeader);
    return { user };
  } catch (error) {
    return {};
  }
}
