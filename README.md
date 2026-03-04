# Booger Aids

**AI-powered CLI that generates unit tests for your code**

Booger is a command-line tool that reads a source file and automatically generates unit tests using an AI model.
It currently supports **Swift (iOS/XCTest)**, **Kotlin (Android/JUnit)**, and **JavaScript/TypeScript (Jest)**.

The goal of Booger is simple:

> Point it at a file → get tests instantly.

---

# Features

* Generate unit tests from a single file
* Works from the command line
* Supports multiple platforms
* Uses AI to detect edge cases and typical scenarios
* Creates correctly named test files automatically

Supported languages:

| Language                | Framework |
| ----------------------- | --------- |
| Swift                   | XCTest    |
| Kotlin                  | JUnit     |
| JavaScript / TypeScript | Jest      |

---

# Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/booger.git
cd booger
```

Install dependencies:

```bash
npm install
```

Build the CLI:

```bash
npm run build
```

Link it globally so you can run the `booger` command anywhere:

```bash
npm link
```

Verify installation:

```bash
booger --help
```

---

# Setup API Key

Booger uses a free LLM API (Groq).

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_api_key_here
```

You can get a key from:

https://console.groq.com

---

# Usage

Generate tests for a file:

```bash
booger gen path/to/file.ts
```

Example:

```bash
booger gen src/add.ts
```

Booger will generate:

```
src/add.test.ts
```

---

# How It Works

Booger follows this workflow:

```
Source File
     │
     ▼
Read Code
     │
     ▼
Build Prompt
     │
     ▼
Send to AI Model
     │
     ▼
Generate Tests
     │
     ▼
Create Test File
```

---

# Project Structure

```
booger/
│
├─ src/
│   ├─ cli.ts
│   ├─ generator.ts
│   ├─ llm.ts
│   ├─ prompts.ts
│
├─ dist/
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

# Example

Input:

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

Command:

```bash
booger gen add.ts
```

Output:

```ts
import { add } from "./add";

describe("add", () => {
  test("adds two numbers", () => {
    expect(add(2,3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-2,3)).toBe(1);
  });
});
```

---

# Future Improvements

Planned features:

* Auto-detect Xcode module names
* Place tests automatically in `Tests/` folders
* Generate mocks for dependencies
* Support entire repository scanning
* Run tests automatically after generation

Example future command:

```bash
booger gen .
```

---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

