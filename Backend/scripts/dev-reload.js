import { spawn } from "child_process";
import { watch } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(backendRoot, "src");
const envFile = path.join(backendRoot, ".env");

let serverProcess = null;
let restartTimer = null;
let restarting = false;

function startServer() {
  console.log("[dev-reload] Starting backend server...");

  serverProcess = spawn(
    process.execPath,
    ["-r", "dotenv/config", "--experimental-json-modules", path.join(sourceDir, "index.js")],
    {
      cwd: backendRoot,
      stdio: "inherit",
      env: process.env,
    }
  );

  serverProcess.on("exit", () => {
    serverProcess = null;

    if (restarting) {
      restarting = false;
      startServer();
    }
  });
}

function restartServer() {
  clearTimeout(restartTimer);

  restartTimer = setTimeout(() => {
    console.log("[dev-reload] Change detected. Restarting backend server...");

    if (!serverProcess) {
      startServer();
      return;
    }

    restarting = true;
    serverProcess.kill();
  }, 150);
}

function watchTarget(targetPath) {
  try {
    watch(targetPath, { recursive: true }, () => {
      restartServer();
    });
  } catch (error) {
    console.error(`Watch failed for ${targetPath}:`, error.message);
  }
}

process.on("SIGINT", () => {
  if (serverProcess) {
    serverProcess.kill("SIGINT");
  }
  process.exit(0);
});

process.on("SIGTERM", () => {
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
  }
  process.exit(0);
});

watchTarget(sourceDir);
watchTarget(envFile);
startServer();
