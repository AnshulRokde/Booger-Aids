export function buildPrompt(code: string, filePath: string) {

return `
You are a senior QA engineer.

Generate unit tests for the following file.

Rules:

- Only output the test file code
- No explanation
- Cover edge cases
- Use correct framework depending on language

Frameworks:
Swift -> XCTest
Kotlin -> JUnit
TypeScript/JavaScript -> Jest

File path:
${filePath}

Code:
${code}
`
}
