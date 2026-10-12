import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

/** the build targets: bun cross-compiles each one into a standalone executable (musl covers alpine). */
const targets = [
  { target: "bun-linux-x64", file: "ts-man-linux-x64" },
  { target: "bun-linux-x64-musl", file: "ts-man-linux-x64-musl" },
  { target: "bun-linux-arm64", file: "ts-man-linux-arm64" },
  { target: "bun-linux-arm64-musl", file: "ts-man-linux-arm64-musl" },
  { target: "bun-darwin-x64", file: "ts-man-macos-x64" },
  { target: "bun-darwin-arm64", file: "ts-man-macos-arm64" },
  { target: "bun-windows-x64", file: "ts-man-windows-x64.exe" },
];

const outDir = join(import.meta.dir, "..", "dist");
mkdirSync(outDir, { recursive: true });

for (const { target, file } of targets) {
  const out = join(outDir, file);
  const result = spawnSync(
    "bun",
    ["build", "--compile", "--minify", `--target=${target}`, "src/cli.ts", "--outfile", out],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    console.error(`build failed for ${target}`);
    process.exit(result.status ?? 1);
  }
  console.log(`built ${file}`);
}
