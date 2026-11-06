/**
 * generate-discord-verification.mjs
 *
 * Build-time script that writes the Discord domain-verification file
 * into public/.well-known/discord so Vite copies it into dist/ as-is.
 *
 * Token source (in priority order):
 *   1. process.env.DISCORD_DOMAIN_VERIFICATION_TOKEN  (CI / Vercel)
 *   2. .env.local  (local development)
 *
 * Usage:
 *   node scripts/generate-discord-verification.mjs
 *   (automatically invoked by the "prebuild" npm script)
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// ── 1. Resolve the token ────────────────────────────────────────

let token = process.env.DISCORD_DOMAIN_VERIFICATION_TOKEN;

// Fallback: parse .env.local when the env var is not already set
// (local development builds outside of Vercel)
if (!token) {
  try {
    const envLocalPath = resolve(PROJECT_ROOT, ".env.local");
    const envContent = readFileSync(envLocalPath, "utf-8");
    for (const line of envContent.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || !trimmed) continue;
      const match = trimmed.match(
        /^DISCORD_DOMAIN_VERIFICATION_TOKEN\s*=\s*(.+)$/
      );
      if (match) {
        token = match[1].trim();
        break;
      }
    }
  } catch {
    // .env.local may not exist — that is fine on CI/Vercel
  }
}

// ── 2. Validate ─────────────────────────────────────────────────

const PLACEHOLDER_VALUES = [
  "dh=YOUR_TOKEN_HERE",
  "YOUR_TOKEN_HERE",
  "",
];

if (!token) {
  console.error(
    "\n✗  DISCORD_DOMAIN_VERIFICATION_TOKEN is not set.\n" +
      "   Set it in .env.local (local) or Vercel Environment Variables (production).\n"
  );
  process.exit(1);
}

if (PLACEHOLDER_VALUES.includes(token)) {
  console.error(
    "\n✗  DISCORD_DOMAIN_VERIFICATION_TOKEN still contains a placeholder value.\n" +
      "   Replace it with the actual token from Discord.\n"
  );
  process.exit(1);
}

if (!token.startsWith("dh=")) {
  console.error(
    `\n✗  DISCORD_DOMAIN_VERIFICATION_TOKEN must start with "dh=".\n` +
      `   Received: "${token.substring(0, 20)}..."\n`
  );
  process.exit(1);
}

// ── 3. Write the verification file ──────────────────────────────

const outputDir = resolve(PROJECT_ROOT, "public", ".well-known");
const outputFile = resolve(outputDir, "discord");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, token, "utf-8");

console.log(`✓  Discord verification file written to public/.well-known/discord`);

