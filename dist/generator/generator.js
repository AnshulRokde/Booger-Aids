"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTests = generateTests;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const llm_js_1 = require("../llm/llm.js");
const prompts_js_1 = require("../prompts/prompts.js");
async function generateTests(filePath) {
    const code = fs_1.default.readFileSync(filePath, "utf8");
    const prompt = (0, prompts_js_1.buildPrompt)(code, filePath);
    const tests = await (0, llm_js_1.askLLM)(prompt);
    const testFile = getTestFileName(filePath);
    fs_1.default.writeFileSync(testFile, tests);
    console.log("Tests created:", testFile);
}
function getTestFileName(file) {
    const ext = path_1.default.extname(file);
    const base = file.replace(ext, "");
    if (ext === ".ts" || ext === ".js")
        return base + ".test" + ext;
    if (ext === ".swift")
        return base + "Tests.swift";
    if (ext === ".kt")
        return base + "Test.kt";
    return base + ".test" + ext;
}
