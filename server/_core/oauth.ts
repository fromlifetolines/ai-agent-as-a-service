import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

export async function verifyAuth(authHeader: string) {
  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Invalid authorization header");
  }

  const token = authHeader.slice(7);

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as any;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
