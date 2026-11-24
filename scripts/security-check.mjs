import fs from "node:fs"
import path from "node:path"

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  let out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out = out.concat(walk(full))
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) out.push(full)
  }
  return out
}

const files = [
  ...walk("app"),
  ...walk("components"),
  ...walk("lib"),
  "next.config.mjs",
].filter(fs.existsSync)

const forbidden = [
  { name: "Hardcoded Google/Firebase API key", re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: "Hardcoded GitHub token", re: /gh[pousr]_[A-Za-z0-9_]{36}/ },
  { name: "Private key material", re: /BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/ },
  { name: "dangerouslySetInnerHTML sink", re: /dangerouslySetInnerHTML/ },
  { name: "Dynamic eval sink", re: /\beval\s*\(/ },
  { name: "new Function sink", re: /new\s+Function\s*\(/ },
]

const failures = []

for (const file of files) {
  const content = fs.readFileSync(file, "utf8")
  for (const rule of forbidden) {
    if (rule.re.test(content)) {
      failures.push(`${file}: matched ${rule.name}`)
    }
  }
  const lines = content.split("\n")
  lines.forEach((line, idx) => {
    if (line.includes('target="_blank"')) {
      const windowText = lines
        .slice(Math.max(0, idx - 2), Math.min(lines.length, idx + 4))
        .join(" ")
      if (
        !windowText.includes("noopener") ||
        !windowText.includes("noreferrer")
      ) {
        failures.push(
          `${file}:${idx + 1}: target="_blank" missing rel="noopener noreferrer"`
        )
      }
    }
  })
}

if (failures.length) {
  console.error("Static security checks failed:\n" + failures.join("\n"))
  process.exit(1)
}

console.log(`Static security checks passed across ${files.length} files.`)
