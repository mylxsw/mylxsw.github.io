import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(projectRoot, "docs");
const outFile = path.join(outDir, "CNAME");

const candidateEnvVars = ["PAGES_CNAME", "CNAME", "VITE_CNAME"];

function readFirstExistingFile(filePaths) {
  for (const filePath of filePaths) {
    try {
      return fs.readFileSync(filePath, "utf8").trim();
    } catch {
      // continue
    }
  }
  return "";
}

const envDomain =
  candidateEnvVars.map((name) => process.env[name]?.trim()).find(Boolean) ?? "";

const fileDomain = readFirstExistingFile([
  path.join(projectRoot, "CNAME"),
  path.join(projectRoot, "public", "CNAME"),
]);

const domain = (envDomain || fileDomain).trim();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, domain ? `${domain}\n` : "\n", "utf8");

if (!domain) {
  console.warn(
    `[ensure-cname] Wrote empty docs/CNAME. Set one of ${candidateEnvVars.join(
      ", "
    )} or add a root/public CNAME file.`
  );
}
