import fs from "fs"
import path from "path"
import { askLLM } from "../llm/llm.js"
import { buildPrompt } from "../prompts/prompts.js"

export async function generateTests(filePath: string) {

  const code = fs.readFileSync(filePath, "utf8")

  const prompt = buildPrompt(code, filePath)

  const tests = await askLLM(prompt)

  const testFile = getTestFileName(filePath)

  fs.writeFileSync(testFile, tests)

  console.log("Tests created:", testFile)
}

function getTestFileName(file: string) {

  const ext = path.extname(file)
  const base = file.replace(ext, "")

  if (ext === ".ts" || ext === ".js")
    return base + ".test" + ext

  if (ext === ".swift")
    return base + "Tests.swift"

  if (ext === ".kt")
    return base + "Test.kt"

  return base + ".test" + ext
}
