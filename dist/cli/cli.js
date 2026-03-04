#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generator_js_1 = require("../generator/generator.js");
const program = new commander_1.Command();
program
    .name("booger")
    .description("AI test generator")
    .version("0.0.1");
program
    .command("gen")
    .argument("<file>", "File to generate tests for")
    .action(async (file) => {
    await (0, generator_js_1.generateTests)(file);
});
program.parse();
