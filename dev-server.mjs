import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Start Vite dev server
const vite = spawn("pnpm", ["exec", "vite", "--host"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});

// Start Express backend server
const backend = spawn("tsx", ["watch", "server/_core/index.ts"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NODE_ENV: "development" },
});

// Handle process termination
process.on("SIGINT", () => {
  vite.kill();
  backend.kill();
  process.exit(0);
});

vite.on("error", (err) => {
  console.error("Vite error:", err);
});

backend.on("error", (err) => {
  console.error("Backend error:", err);
});
