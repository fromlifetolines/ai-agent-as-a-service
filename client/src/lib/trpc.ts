import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/_core/trpc";

export const trpc = createTRPCReact<AppRouter>();
